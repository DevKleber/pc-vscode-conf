<?php

return PhpCsFixer\Config::create()
    ->setRules(array(
        '@PhpCsFixer' => true,
        'no_mixed_echo_print' => array('use' => 'print'),
        'echo_tag_syntax' => array('format' => 'short'),
        'general_phpdoc_annotation_remove' =>["author","autor"], //Removendo o comentario escrito author
        'increment_style' => array('style' => 'post'),
        'yoda_style'=>false
    ))
    //->setIndent("\t")
    ->setLineEnding("\n")
;