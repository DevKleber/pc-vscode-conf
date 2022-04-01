<?php
/*
 * Função inserir e correlatas;
 */

namespace SemLogin\Model\AbrirDenuncia;

use Agrodefesa\Resque\AgroResque;

trait Insert
{
	public function inserir($arValores)
	{
		$arValores['id_unidademovel'] = null;
		$idDenunciaAbrir = $this->dbAbrirDenuncia->_inserir($arValores);

		if (!empty($arValores['id_arquivo'])) {
			$isData = ['id_denunciaabrir' => $idDenunciaAbrir, 'id_arquivo' => $arValores['id_arquivo']];
			$this->dbArquivoDenuncia->_inserir($isData);
		}
		
		if (!empty($arValores['endereco'])) {
			$idEndereco = $this->dbAgrocomumEndereco->_inserir($arValores['endereco'][0]);
			$this->dbEnderecoDenuncia->_inserir(['id_endereco' => $idEndereco, 'id_denunciaabrir' => $idDenunciaAbrir, 'ds_pontoreferencia' => $arValores['endereco'][0]['ds_pontoreferencia']]);
		}

		$isData = [
			'id_denunciaabrir' => $idDenunciaAbrir, 
			'id_pessoa' => $arValores['id_pessoa'], 
			'id_pessoa_responsavel' => \SemLogin\Model\AbrirDenuncia::USUARIO_WEB, 
			'ts_registro' => date('d/m/Y H:i:s'), 
			'id_situacao' => '1', 
			'ds_complementar' => 'Abertura de Denúncia', 
			'id_unidademovel' => $arValores['id_unidademovel'], 
			'id_arquivo' => $arValores['id_arquivo']
		];
		$this->dbHistoricoDenuncia->_inserir($isData);
		
		$this->enviarEmail($arValores);

		$this->redirecionarTela(FUNCAO_INSERIR);
		return $idDenunciaAbrir;
	}

	public function incluirHistoricoDenuncia($arValores)
	{
		return $this->dbHistoricoDenuncia->_inserir($arValores);
	}

	private function enviarEmail($arValores)
	{
		$email = "ascom@aderr.rr.gov.br";
		$data = date('d/m/Y H:i:s');

		$assunto = "SIGADERR - Nova Denúncia";
		$texto = "
			<p>
				Há uma denuncia registrada no Sistema de Denuncias do SIGADERR e encaminhada à sua analise.
				<br>
				Procolo número: <b> {$arValores['nu_denuncia']} / {$arValores['nu_ano']} </b> 
				foi enviada na data  {$data} 
			</p>
			<br>
			<b>Descrição/Observação da denuncia</b>:  {$arValores['ds_assunto']}
			<br><br>
			Para mais informações acessar o menu Fiscalização->Denuncia, do SIGADERR.
			<br><br>
			<b>Esta é uma mensagem automática, este email não deve ser respondido.</b>
		";

		$args = [
			"emails" => $email,
			"ds_assunto" => $assunto,
			"tx_email" => $texto,
		];

		AgroResque::enqueue("email", "Db\Job\EmailJob", $args);
	}
}
