<?php
// backend/export-blogs.php — public snapshot, private CMS remains unchanged.
function exportPublishedBlogs(array $posts): void {
    $root = dirname(__DIR__);
    $source = __DIR__ . '/storage/media';
    $dataDir = $root . '/public/data';
    $imageDir = $root . '/public/images/blogs';
    foreach ([$dataDir, $imageDir] as $folder) {
        if (!is_dir($folder) && !mkdir($folder, 0755, true) && !is_dir($folder)) {
            throw new RuntimeException('Cannot create ' . $folder);
        }
    }
    $rewrite = function (string $text) use ($source, $imageDir): string {
        return preg_replace_callback('~ /api/blog\.php\?action=media&(?:amp;)?name=([a-f0-9]{32}\.(?:jpg|png|webp)) ~x', function ($match) use ($source, $imageDir) {
            $name = $match[1];
            if (!is_file($source . '/' . $name)) throw new RuntimeException('Missing media: ' . $name);
            if (!is_file($imageDir . '/' . $name) && !copy($source . '/' . $name, $imageDir . '/' . $name)) {
                throw new RuntimeException('Cannot copy media: ' . $name);
            }
            return '/images/blogs/' . $name;
        }, $text);
    };
    $public = [];
    $fields = ['id','title','slug','category','author','description','seoTitle','seoDescription','image','imageAlt','content','publishedAt','updatedAt'];
    foreach ($posts as $post) {
        if (($post['status'] ?? '') !== 'published') continue;
        $entry = array_intersect_key($post, array_flip($fields));
        $entry['image'] = $rewrite($entry['image'] ?? '');
        $entry['content'] = $rewrite($entry['content'] ?? '');
        $public[] = $entry;
    }
    usort($public, fn($a,$b) => strcmp($b['publishedAt'] ?? '', $a['publishedAt'] ?? ''));
    $json = json_encode($public, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    $tmp = tempnam($dataDir, 'blogs-');
    if ($tmp === false || file_put_contents($tmp, $json) === false || !rename($tmp, $dataDir . '/blogs.json')) {
        if ($tmp !== false && is_file($tmp)) unlink($tmp);
        throw new RuntimeException('Cannot write public blogs.json');
    }
}

// Run manually once to migrate all existing published blogs.
if (PHP_SAPI === 'cli' && realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    $dir = __DIR__ . '/storage';
    $lock = fopen($dir . '/posts.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) throw new RuntimeException('Cannot lock blog storage');
    try {
        $file = $dir . '/posts.json';
        $posts = is_file($file) ? json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR) : [];
        if (!is_array($posts)) throw new RuntimeException('Invalid posts.json');
        exportPublishedBlogs($posts);
        echo "Published blogs exported successfully.\n";
    } finally { flock($lock, LOCK_UN); fclose($lock); }
}
