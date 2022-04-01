<?php
$versaoJS = 3;
if (!IS_AJAX) {
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/jquery/dist/jquery.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/jquery.maskedinput/dist/jquery.maskedinput.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/trumbowyg/dist/trumbowyg.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/trumbowyg/dist/langs/pt.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."eq.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."material.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."mdl-ext.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."jquery.qrcode.js\"></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."mdl-jquery-modal-dialog.js'></script>\n";

    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/momentjs/moment.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/momentjs/locale/pt-br.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/bootstrap-material-design/dist/js/material.min.js\"></script>\n";
    echo "<script type='text/javascript' src=\"".PASTA_JAVASCRIPT.DS_URL."bower_components/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js\"></script>\n";

    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jquery".DS_URL."jquery.fixedtableheader.min.js' ></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jquery".DS_URL."jquery.deparam.js' ></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jquery".DS_URL."jquery.sortable.js' ></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jqueryui".DS_URL."jquery-ui-1.9.2.custom.min.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jqueryui".DS_URL."jquery-ui-i18n.min.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jqueryui".DS_URL."jquery-ui-timepicker-addon.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jquery.price_format.js'></script>\n";

    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."nti.js?v={$versaoJS}'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."constantes.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."eventos.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."fileupload".DS_URL."jquery.iframe-transport.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."fileupload".DS_URL."jquery.ui.widget.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."fileupload".DS_URL."jquery.fileupload.js'></script>\n";

    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jquery.sticky.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jquery.bwlaccordion.min.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."chosen.jquery.min.js'></script>\n";

    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."metisMenu.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."jquery.mask.min.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."megamenu.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."sweetalert2.all.min.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."intro.min.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."daterangepicker.js?v={$versaoJS}'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."datatables.min.js?v={$versaoJS}'></script>\n";

    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."toastify-js.js'></script>\n";
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."socket.io.min.js'></script>\n";    

    // Constrói javascripts de dentro da pasta (include) dos módulos.
    $javascript = array();
    $funcoes = array();
    if(isset($this->js_servico)) {
        ob_start();
        foreach ($this->js_servico as $file) {
            include_once $file;
            $nome_arquivo = substr(strrchr($file, DS_URL), 1);
            if (strpos($nome_arquivo, '_funcoes.js') !== false) {
                $funcoes[] = ob_get_contents();
            } else {
                $javascript[] = ob_get_contents();
            }
            ob_clean();
        }
        ob_end_flush();
    }
    echo "<script type='text/javascript'>\n";
    echo "$(function() {\n";
    echo "\n";
    echo implode('',$javascript);
    echo "\n";
    echo "});\n";
    echo implode('',$funcoes);
    echo "\n";
    echo "</script>\n";

    // Declara variáveis que serão usadas na comunicação entre javascript e php

    if (isset($this->layout()->nomeModule) && isset($this->layout()->nomeController)) {
        $isProducao = IS_PRODUCAO ? "true" : "false";
        $ar_constante = [];
        $arUrl = parse_url(\Agrodefesa\Util\Util::getUrlCurrent());
        $url = $this->url(strtolower($nomeModule)."/default",
            ["controller" => strtolower($nomeServico)]);
        //$baseurl = $this->url("home", ["controller" => ""]);
        $baseurl = str_replace('/application/index/index', '', $url);
        $baseurl = str_replace('/application/index', '', $url);
        $ar_constante[] = "<script type='text/javascript'>\n";
        $ar_constante[] = "constantes.base_url = '".$baseurl."';\n";
        $ar_constante[] = "constantes.url = '".$url."';\n";
        $ar_constante[] = "constantes.modulo = '".$nomeModuleUrl."';\n";
        $ar_constante[] = "constantes.isProducao = {$isProducao};\n";
//        $ar_constante[] = "constantes.modulo = '".$this->layout()->nomeModule."';\n";
        $ar_constante[] = "constantes.servico = '".$this->layout()->nomeController."';\n";
        $ar_constante[] = "constantes.funcionalidade = '".$this->layout()->nomeAction."';\n";
        $ar_constante[] = "nti.setUrl('".$url."');\n";
        $ar_constante[] = "nti.setDelimitador('".DELIMITADOR."');\n";
        $ar_constante[] = "nti.setDelimitadorCampo('".DELIMITADOR_CAMPO."');\n";
        $ar_constante[] = "nti.setCaractereEComercial('".CARACTERE_ECOMERCIAL."');\n";
        $ar_constante[] = "nti.setCaractereIgual('".CARACTERE_IGUAL."');\n";
        //$ar_constante[] = "Deferred.define();\n";
        $ar_constante[] = "</script>\n";

        foreach ($ar_constante as $valor) {
            print $valor;
        }
    }
    echo "<script type='text/javascript' src='".PASTA_JAVASCRIPT.DS_URL."inclusoesGerais.js'></script>\n";
}
