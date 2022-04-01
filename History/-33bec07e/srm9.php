<?php
/**
 * Classe responsável por definir variáveis globais para manipulação de arquivos
 * do framework sidago.
 */
namespace Agrodefesa\Bootstrap;

class VariaveisAmbiente
{
    public static function init()
    {
        self::definirVariaveisManipulacaoPasta();
        self::definirCaminhoRelativo();
        self::definirCaminhoAbsoluto();
        self::definirCaminhoApplication();
        self::definirPastasDosModulos();
        self::definirPropriedadesGlobais();
        self::definirNomeFuncionalidades();
        self::definirArquivos();
    }

    /**
     * Definir caminho relativo do sistema
     */
    private static function definirCaminhoRelativo()
    {
        define('BASE_URL',
                substr(
                $_SERVER['PHP_SELF'],
                0,
                strpos($_SERVER['PHP_SELF'] ,
                '/public/index.php'))) ;
    }
    
    /**
     * Caminho absoluto base do sistema
     */
    private static function definirCaminhoAbsoluto()
    {
        $dir_root = $_SERVER['PHP_SELF'];
        $ar_dir = explode('/', $dir_root);
        foreach ($ar_dir as $pasta) {
            if ($pasta == 'public') {
                break;
            }
            $ar_path[] = $pasta;
        }
        $temp = implode(DS_URL, $ar_path);
        if (substr($temp, 0, 1) == DS_URL) {
            $temp = substr($temp, 1, strlen($temp) - 1);
        }
        $base = implode(DS_URL, $ar_path);
        define('BASEURL', implode(DS_URL, $ar_path));
    }
    
    /**
     * Definir caminho relativo da pasta application
     */
    private static function definirCaminhoApplication()
    {
        // Define path to application directory
        defined('APPLICATION_PATH')
            || define('APPLICATION_PATH', 
                    realpath(dirname(__FILE__).'/../Application'));
    }
    
    private static function definirVariaveisManipulacaoPasta () 
    {
        // Definição de constantes para manipulação de diretórios
        define('DS', DIRECTORY_SEPARATOR);
        define('DS_URL', "/");
        define('PS', PATH_SEPARATOR);
        define('BP', getcwd());
        define('NOME_SERVIDORWEBPRODUCAO', 'sigama.aged.ma.gov.br');
        define('NOME_SERVIDORWEBTESTE', 'sigama.aged.ma.gov.br');
        define('NOME_SERVIDORWEBLOADBALANCE_1', 'sigama.aged.ma.gov.br');
        define('NOME_SERVIDORWEBLOADBALANCE_2', 'sigama.aged.ma.gov.br');
        define('NOME_SERVIDORWEBAGRODEFESA', 'sigama.aged.ma.br');
        define('NOME_SERVIDORWEBPRODUCAO_0', 'sigama.aged.ma.gov.br');
        define('NOME_SERVIDORWEBPRODUCAO_1', 'sigama.aged.ma.gov.br');
        define('NOME_SERVIDORWEBPRODUCAO_2', 'sigama.aged.ma.gov.br');
    }
    
    private static function definirPropriedadesGlobais() {
        define('IS_AJAX', self::checkAjax());
        define('IS_NATIVO', \Agrodefesa\Network\Forward::checkMarcador());
        define('IS_PRODUCAO',  self::checkServidorProducao());
        define('IS_ACESSOWEB', self::checkAcessoViaBrowser());
        define('IS_DEVELOPER', self::checkIsDesenvolvimento());
        define('IS_WEBSERVICE', self::checkWebservice());
        define('DELIMITADOR', chr(3));
        define('DELIMITADOR_CAMPO', chr(4));
        define('CARACTERE_ECOMERCIAL', chr(5));
        define('CARACTERE_IGUAL', chr(6));
        define('RESPONSAVEL_TESTE_FUNCIONAL', self::checkPastaResponsavelTesteFuncional());
        define('GIT_BRANCH', self::checkGitBranch());
        define('LISTA_BRANCHES', self::listGitBranch());
    }
    
    private static function definirPastasDosModulos() {
        define('PASTA_PUBLIC', "public");
        define('PASTA_CONFIG', BP.DS."config");
        define('PASTA_FILE', "/file");
        define('PASTA_TEMP', "/temp");
        define('PASTA_MODULE', BP.DS."module");
        define('PASTA_IMAGENS', "/img");
        define('PASTA_ESTILO', "/css");
        define('PASTA_FTP', "/ftp");
        define('PASTA_FONTE', "/fonts");
        define('PASTA_JAVASCRIPT', "/js");
        define('PASTA_JQUERY', "/scripts" . DS_URL . "jquery");
        define('MODULO_SCRIPT', "Include" . DS_URL . "script");
        define('MODULO_CSS', "Include" . DS_URL . "css");
        define('MODULO_CONFIG', "include" . DS_URL . "config");
        define('MODULO_BOOTSTRAP', "include");
        define('POM_XML', "pom.xml");
    }
    private static function definirArquivos(){
		define('CONFIG_GLOBAL', BP.DS."config".DS.'autoload'.DS.'global.php');
	}
    private static function definirNomeFuncionalidades()
    {
        define("FUNCAO_LISTAR", "listar");
        define("FUNCAO_INSERIR", "inserir");
        define("FUNCAO_EXCLUIR", "excluir");
        define("FUNCAO_ALTERAR", "alterar");
        define("FUNCAO_DETALHAR", "detalhar");
        define("FUNCAO_IMPRIMIR", "imprimir");
        define("FUNCAO_IMPRIMIR_LISTAGEM", "imprimir-listagem");
        define("FUNCAO_PESQUISAR", "pesquisar");
        define("FUNCAO_ADICIONAR", "adicionar");
        define("FUNCAO_RELATORIO", "relatorio");
        define("FUNCAO_PARAMETRO", "parametro");
        define("FUNCAO_VISUALIZAR", "tela-visualizar");
    }

    /**
     * Testa se o servidor que roda o sistema é o servidor de produção da Agrodefesa.
     * 
     * @return boolean
     */
    private static function checkServidorProducao()
    {
        return true;
        $boResposta = false;
        $servidor = '';
        if(isset($_SERVER['SERVER_NAME'])){
            $servidor = $_SERVER['SERVER_NAME'];
        }
        $servidorUname = php_uname('n');
        
        if($servidor===NOME_SERVIDORWEBPRODUCAO || $servidor===NOME_SERVIDORWEBLOADBALANCE_1 || $servidor===NOME_SERVIDORWEBLOADBALANCE_2  || $servidor===NOME_SERVIDORWEBAGRODEFESA || $servidor===NOME_SERVIDORWEBPRODUCAO_0 || $servidor===NOME_SERVIDORWEBPRODUCAO_1 || $servidor===NOME_SERVIDORWEBPRODUCAO_2) {
            $boResposta = true;
        }
        
        if($servidorUname===NOME_SERVIDORWEBPRODUCAO || $servidorUname===NOME_SERVIDORWEBLOADBALANCE_1 || $servidorUname===NOME_SERVIDORWEBLOADBALANCE_2  || $servidorUname===NOME_SERVIDORWEBAGRODEFESA || $servidorUname===NOME_SERVIDORWEBPRODUCAO_0 || $servidorUname===NOME_SERVIDORWEBPRODUCAO_1 || $servidorUname===NOME_SERVIDORWEBPRODUCAO_2) { 
            $boResposta = true;
        }
        return $boResposta;
    }
    
    private static function checkAjax()
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }
    
    private static function checkAcessoViaBrowser()
    {
        (php_sapi_name() === 'cli')?true:false;
    }
    
    /**
     * Descobrir uma forma de resolver melhor essa análise, pois meio não é 
     * totalmente seguro.
     * @return boolean
     */
    private static function checkWebservice()
    {
        $boWebservice = false;
        $strWs = "/webservice/";
        if(strpos($_SERVER['PHP_SELF'], $strWs)) {
            $boWebservice = true;
        }
        return $boWebservice;
    }

    private static function listGitBranch() {
        $branches = shell_exec("git branch -r");
        return array_slice(explode("\n", $branches), 1, -1);
    }

    private static function checkGitBranch() {
        return implode('/', array_slice(explode('/', file_get_contents('.git/HEAD')), 2));
    }

    private static function checkPastaResponsavelTesteFuncional() {
        return array_slice(explode('/', realpath(dirname(__FILE__).'/../../../../')), 2)[2];
    }

    private static function checkIsDesenvolvimento()
    {
        $ini = new \Laminas\Config\Reader\Ini();
        
        if (!file_exists('config/developer.ini')) {
            return false;
        }
        $developer = $ini->fromFile('config/developer.ini');
        
        if ($developer['ambiente']??''=='1') {
            return true;
        }

    }

}
