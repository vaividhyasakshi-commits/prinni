<?php
declare(strict_types=1);
$dir=dirname(__DIR__).'/storage';
if(!is_dir($dir)) mkdir($dir,0700,true);
$media=$dir.'/media'; if(!is_dir($media)) mkdir($media,0700,true);
$action=$_GET['action']??'list';
header('X-Content-Type-Options: nosniff');
if($action==='media') {
 $name=$_GET['name']??''; if(!preg_match('/^[a-f0-9]{32}\.(jpg|png|webp)$/D',$name)||!is_file($media.'/'.$name)){http_response_code(404);exit;}
 header('Content-Type: '.(['jpg'=>'image/jpeg','png'=>'image/png','webp'=>'image/webp'][pathinfo($name,PATHINFO_EXTENSION)])); header('Cache-Control: public, max-age=31536000, immutable'); readfile($media.'/'.$name);exit;
}
header('Content-Type: application/json; charset=utf-8'); header('Cache-Control: no-store');
function out($data,$status=200){http_response_code($status);echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_INVALID_UTF8_SUBSTITUTE);exit;}
function fail($s,$code=400){out(['error'=>$s],$code);}
function readBody(){ $raw=file_get_contents('php://input',false,null,0,2000001); if(strlen($raw)>2000000)fail('Request too large',413); $v=json_decode($raw,true);if(!is_array($v))fail('Invalid JSON');return $v; }
function textField($d,$k,$max,$required=true){$v=$d[$k]??'';if(!is_string($v)||strlen($v)>$max||($required&&trim($v)===''))fail('Invalid '.$k);return trim($v);}
function store($write,$fn){global $dir;$lock=fopen($dir.'/posts.lock','c');if(!$lock||!flock($lock,$write?LOCK_EX:LOCK_SH))fail('Storage unavailable',500);$file=$dir.'/posts.json';$posts=is_file($file)?json_decode(file_get_contents($file),true):[];if(!is_array($posts))fail('Storage damaged',500);$result=$fn($posts);if($write){$tmp=tempnam($dir,'posts-');if($tmp===false||file_put_contents($tmp,json_encode($posts,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR))===false||!rename($tmp,$file))fail('Unable to save',500);}flock($lock,LOCK_UN);fclose($lock);return $result;}
function published($p){return $p['status']==='published';}
function summaries($posts){usort($posts,fn($a,$b)=>strcmp($b['publishedAt']??$b['createdAt'],$a['publishedAt']??$a['createdAt']));return array_map(function($p){unset($p['content']);return $p;},$posts);}
if($action==='list'){out(store(false,fn($p)=>summaries(array_values(array_filter($p,'published')))));}
if($action==='post'){ $slug=$_GET['slug']??'';$p=store(false,function($ps)use($slug){foreach($ps as $p)if(published($p)&&$p['slug']===$slug)return $p;return null;});if(!$p)fail('Article not found',404);out($p);}
session_set_cookie_params(['httponly'=>true,'secure'=>!empty($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!=='off','samesite'=>'Strict','path'=>'/']);session_start();
if($action==='session'){out(['loggedIn'=>!empty($_SESSION['admin']),'csrf'=>$_SESSION['csrf']??null]);}
if($_SERVER['REQUEST_METHOD']!=='POST'&& !in_array($action,['admin-list','admin-post'],true))fail('Method not allowed',405);
if($action==='login'){
 $data=readBody();$password=textField($data,'password',1024);$hashFile=$dir.'/password.hash';if(!is_file($hashFile))fail('Run php backend/setup.php first',503);
 $ip=hash('sha256',$_SERVER['REMOTE_ADDR']??'local');$f=fopen($dir.'/attempt-'.$ip,'c+');flock($f,LOCK_EX);$a=json_decode(stream_get_contents($f),true)?:['time'=>time(),'count'=>0];if(time()-$a['time']>900)$a=['time'=>time(),'count'=>0];if($a['count']>=8)fail('Too many attempts. Try again later.',429);$ok=password_verify($password,trim(file_get_contents($hashFile)));$a['count']=$ok?0:$a['count']+1;rewind($f);ftruncate($f,0);fwrite($f,json_encode($a));flock($f,LOCK_UN);fclose($f);if(!$ok)fail('Incorrect password',401);session_regenerate_id(true);$_SESSION['admin']=true;$_SESSION['csrf']=bin2hex(random_bytes(32));out(['loggedIn'=>true,'csrf'=>$_SESSION['csrf']]);
}
if(empty($_SESSION['admin']))fail('Login required',401);
if($action==='admin-list')out(store(false,fn($p)=>summaries(array_values($p))));
if($action==='admin-post'){ $id=$_GET['id']??'';$p=store(false,fn($ps)=>$ps[$id]??null);if(!$p)fail('Not found',404);out($p);}
if(!hash_equals($_SESSION['csrf'],$_SERVER['HTTP_X_CSRF_TOKEN']??''))fail('Invalid security token',403);
if($action==='logout'){$_SESSION=[];session_destroy();out(['ok'=>true]);}
if($action==='upload'){
 $f=$_FILES['image']??null;if(!$f||$f['error']!==UPLOAD_ERR_OK||$f['size']>5*1024*1024)fail('Upload JPG, PNG or WebP under 5 MB');$info=@getimagesize($f['tmp_name']);$mime=(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);$ext=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'][$mime]??null;if(!$ext||!$info||$info['mime']!==$mime||$info[0]>6000||$info[1]>6000)fail('Invalid image or dimensions');$name=bin2hex(random_bytes(16)).'.'.$ext;if(!move_uploaded_file($f['tmp_name'],$media.'/'.$name))fail('Upload failed',500);out(['url'=>'/api/blog.php?action=media&name='.$name]);
}
if($action==='delete'){ $d=readBody();$id=textField($d,'id',40);out(store(true,function(&$ps)use($id){if(!isset($ps[$id]))fail('Not found',404);unset($ps[$id]);return ['ok'=>true];}));}
if($action==='save'){
 $d=readBody();$id=textField($d,'id',40,false);$title=textField($d,'title',250);$slug=textField($d,'slug',180);if(!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D',$slug))fail('Use lowercase letters, numbers and hyphens in slug');$status=$d['status']??'';if(!in_array($status,['draft','published'],true))fail('Invalid status');
 $p=['title'=>$title,'slug'=>$slug,'status'=>$status,'category'=>textField($d,'category',100),'author'=>textField($d,'author',100),'description'=>textField($d,'description',500),'seoTitle'=>textField($d,'seoTitle',180,false),'seoDescription'=>textField($d,'seoDescription',500,false),'image'=>textField($d,'image',250,$status==='published'),'imageAlt'=>textField($d,'imageAlt',250,$status==='published'),'content'=>textField($d,'content',1500000,$status==='published')];
 if($p['image']!==''&&(!preg_match('~^/api/blog\.php\?action=media&name=([a-f0-9]{32}\.(?:jpg|png|webp))$~D',$p['image'],$m)||!is_file($media.'/'.$m[1])))fail('Invalid featured image');
 if($status==='published'&&trim(html_entity_decode(strip_tags($p['content'])))==='')fail('Article content required');
 out(store(true,function(&$ps)use($id,$p,$status,$slug){if($id!==''&&!isset($ps[$id]))fail('Not found',404);foreach($ps as $other)if($other['id']!==$id&&$other['slug']===$slug)fail('Slug already used',409);$old=$ps[$id]??null;$id=$id?:bin2hex(random_bytes(12));$now=gmdate('c');$p['id']=$id;$p['createdAt']=$old['createdAt']??$now;$p['updatedAt']=$now;$p['publishedAt']=$old['publishedAt']??($status==='published'?$now:null);$ps[$id]=$p;return $p;}));
}
fail('Unknown action',404);