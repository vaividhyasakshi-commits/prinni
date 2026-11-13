<?php
if (PHP_SAPI !== 'cli') exit;
$dir=__DIR__.'/storage'; if(!is_dir($dir)) mkdir($dir,0700,true);
if(file_exists($dir.'/password.hash')) { echo "Admin already configured. To reset, remove password.hash locally.\n"; exit; }
echo 'Choose admin password (12+ characters): '; $pass=trim(fgets(STDIN));
if(strlen($pass)<12) {fwrite(STDERR,"Password too short\n");exit(1);}
file_put_contents($dir.'/password.hash',password_hash($pass,PASSWORD_DEFAULT),LOCK_EX); chmod($dir.'/password.hash',0600);
echo "Admin configured.\n";