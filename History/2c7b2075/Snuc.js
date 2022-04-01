var nti = new NTI();
var comum = new COMUM();

function COMUM() {}

function NTI() {
  var bo_evento = false;
  var nti = this;
  var url;
  var servico;
  var delimitador;
  var caractere_igual;
  var caractere_e;
  var delimitador_campo;
  var mensagem_erro = "ui-state-error";
  var mensagem_alerta = "ui-state-highlight";
  var nomeClasseAgrupar = "fk-agrupar";
  var nomeClasseAgruparPai = "fk-agrupar-li";
  var nomeClasseAgruparLista = "fk-agrupar-ul";

  this.ar_erros = new Array();

  this.setUrl = function (caminho_url) {
    this.url = caminho_url;
  };

  this.setServico = function (nome_servico) {
    this.servico = nome_servico;
  };

  this.setDelimitador = function (caractere) {
    this.delimitador = caractere;
  };

  this.setDelimitadorCampo = function (caractere) {
    this.delimitador_campo = caractere;
  };

  this.setCaractereEComercial = function (caractere) {
    this.caractere_e = caractere;
  };

  this.setCaractereIgual = function (caractere) {
    this.caractere_igual = caractere;
  };

  this.onError = function (msg, url, linha) {
    alert("LINHA:" + linha + "\n URL:" + url + "\n MSG:" + msg);
    return true;
  };

  this.alterar = function (pagina) {
    window.location = pagina;
  };

  this.incluir = function (pagina) {
    window.location = pagina;
  };

  this.get_default = function (valor, def) {
    return typeof valor == "undefined" ? def : valor;
  };

  /**
   *
   */
  this.mensagem = function (tipo, texto, ar_funcoes) {
    /**
     * @todo colocar qual o elemento que receberá focus, tanto ao abrir, quanto ao fechar
     */
    /**
     * Valores default para argumentos Javascript
     */
    ar_funcoes = get_default(ar_funcoes, new Array());

    tipo = typeof tipo == "undefined" ? nti.mensagem_alerta : tipo;

    $("#conteudo").append('<div id="mensagem"></div>');
    $("#mensagem").addClass(tipo + " ui-corner-all");
    $("#mensagem").html(texto);
    $("#mensagem").dialog({
      resizable: false,
      height: 140,
      modal: true,
      title: "Mensagem do Sistema",
      buttons: {
        Confirmar: function () {
          $("#mensagem").dialog("destroy");
        },
        Fechar: function () {
          $("#mensagem").dialog("destroy");
        },
      },
    });
  };

  this.mensagemSweet = function (html, icon = 'success', title = 'Mensagem do Sistema', confirmButtonText = 'OK') {
    Swal.fire({
      title: title,
      html: html,
      icon: icon,
      showCancelButton: false,
      confirmButtonColor: '#3d475a',
      confirmButtonText: confirmButtonText
    });
  }
  
  this.mensagemComRedirect = function (html, url, icon = 'success', title = 'Mensagem do Sistema', confirmButtonText = 'OK') {
    if ($("#boxConfirmacaoSalvar").html() == null) {
      Swal.fire({
        title: title,
        html: html,
        type: icon,
        showCancelButton: false,
        confirmButtonColor: "#3d475a",
        confirmButtonText: confirmButtonText,
      }).then((result) => {
        if (result.value) {
          window.location = url;
        }
      });
    }
  };

  /**
   *
   */
  this.janela = function (titulo, url, altura, largura) {
    tipo = typeof tipo == "undefined" ? nti.mensagem_alerta : tipo;

    $("#conteudo").append('<div id="mensagem"></div>');
    $.ajax({
      type: "POST",
      url: url,
      cache: false,
      success: function (resultado) {
        $("#mensagem").html(resultado);
        $("#mensagem").dialog({
          resizable: false,
          height: largura,
          width: largura,
          modal: true,
          title: titulo,
          buttons: {
            Fechar: function () {
              $("#mensagem").remove();
              $("#mensagem").dialog("close");
            },
          },
        });
      },
      error: function () {},
      notmodified: function () {},
      timeout: function () {},
      abort: function () {},
    });
  };

  this.imprimir = function (id_registro) {
    $("#erroGenerico").removeClass("ui-state-error ui-corner-all");
    $.ajax({
      type: "POST",
      url: constantes.url + "/validar-impressao",
      data: "id=" + id_registro,
      cache: false,
      success: function (data) {
        window.location = nti.url + "/imprimir/id/" + id_registro;
      },
      error: function (data) {
        var obj = JSON.parse(data.responseText);
        var mensagem = "";
        for (var i in obj.mensagens) {
          mensagem = mensagem.concat("<li>" + obj.mensagens[i] + "</li>");
        }
        $("#boxDelete").html("<ul>" + mensagem + "</ul>");
        $("#boxDelete").dialog({
          resizable: true,
          modal: true,
          height: 300,
          width: 300,
          title: "Mensagem do Sistema",
          buttons: {
            Fechar: function () {
              $("#boxDelete").dialog("close");
            },
          },
        });
      },
    });
  };

  this.imprimirCise = function (id_registro) {
    $("#erroGenerico").removeClass("ui-state-error ui-corner-all");
    $.ajax({
      type: "POST",
      url: constantes.url + "/validar-impressao",
      data: "id=" + id_registro,
      cache: false,

      success: function (data) {
        if (data.status == "success") {
          window.location = nti.url + "/imprimir/id/" + id_registro;
        } else if (data.status == "error") {
          $("#boxDelete").html("<ul>" + data.mensagem + "</ul>");
          $("#boxDelete").dialog({
            resizable: true,
            modal: true,
            height: 300,
            width: 400,
            title: "Mensagem do Sistema",
            buttons: {
              Fechar: function () {
                $("#boxDelete").dialog("close");
              },
            },
          });
        }
      },
      error: function (data) {
        var obj = JSON.parse(data.responseText);
        var mensagem = "";
        for (var i in obj.mensagens) {
          mensagem = mensagem.concat("<li>" + obj.mensagens[i] + "</li>");
        }
        $("#boxDelete").html("<ul>" + mensagem + "</ul>");
        $("#boxDelete").dialog({
          resizable: true,
          modal: true,
          height: 300,
          width: 300,
          title: "Mensagem do Sistema",
          buttons: {
            Fechar: function () {
              $("#boxDelete").dialog("close");
            },
          },
        });
      },
    });
  };

  this.itemMenu = function (url) {
    window.location = url;
  };

  this.trocarperfil = function () {
    $("#negative").click();
    $('<div id="div-perfil"></div>').load(
      "/application/index/trocar-perfil",
      function (pagina) {
        $("#boxPerfil").html(pagina);
        $("#boxPerfil").dialog({
          resizable: true,
          height: "auto",
          width: 350,
          modal: true,
          title: "Alterar Perfil de Acesso",
          buttons: {
            Confirmar: function () {
              $(":button").css("display", "none");
              $.ajax({
                type: "POST",
                url: "/application/index/carregar-perfil-alterado",
                data: {
                  id_perfil: $("#perfil").val(),
                },
                success: function () {
                  $(
                    "<div><br><strong>Perfil alterado com sucesso.</strong></div></div>"
                  ).dialog({
                    modal: true,
                    width: "auto",
                    buttons: {
                      OK: function () {
                        $(this).dialog("close");
                      },
                    },
                  });
                  window.location = "/";
                },
                error: function (data) {
                  $(
                    "<b style='color:red;'>" +
                      $(data.responseText).find("#exception").html() +
                      "</b>"
                  ).appendTo($("#boxDelete"));
                },
              });
            },
            Cancelar: function () {
              setTimeout(function () {
                window.location.reload(1);
              }, 600000);
              $(this).dialog("close");
            },
          },
        });
      }
    );
  };

  this.apagar = function (registro) {
    $("#boxDelete").html("Deseja remover esse conteúdo?");
    $(function () {
      $("#dialog:ui-dialog").dialog("close");

      $("#boxDelete").dialog({
        resizable: false,
        height: 180,
        modal: true,
        title: "Tela de confirmação",
        buttons: {
          Apagar: function () {
            $("<div></div>").load(registro, function (resultado) {
              if (resultado == "") {
                return;
              }
              try {
                var retorno = JSON.parse(resultado);
              } catch (error) {
                alert(
                  "Ocorreu um erro no servidor.\nJá estamos trabalhando para corrigi-lo!"
                );
                console.log(resultado);
                return false;
              }

              if (nti.isArray(retorno)) {
                if (retorno[0] == "erro") {
                  var generico = "";
                  for (var i in retorno[1]) {
                    generico = generico.concat(
                      "<h4>" + retorno[1][i] + "</h4>"
                    );
                  }
                  if (generico.length > 0) {
                    $("#boxDelete").html(generico);
                  }
                } else if (retorno[0] == "ok") {
                  $("#boxDelete").addClass("ui-state-highlight ui-corner-all");
                  $("#boxDelete").addClass("margin-top: 20px; padding: 12px;");
                  /** @todo passar estilo para uma classe e public*/
                  $("#boxDelete").html(
                    "<strong>Registro alterado com sucesso!</strong>"
                  );
                  $("#boxDelete").dialog({
                    buttons: {
                      Ok: function () {
                        $(this).dialog("close");
                        $("#formPesquisar").submit();
                      },
                    },
                  });
                }
              }
            });
          },
          Cancelar: function () {
            $(this).dialog("close");
          },
        },
      });
    });
  };

  this.inserirComConfirmacaoDosDados = function (
    url,
    dom,
    evento,
    mensagem_confirmacao_insercao
  ) {
    if ($("#boxConfirmacaoSalvar").html() == null) {
      Swal.fire({
        title: "Aviso",
        html: mensagem_confirmacao_insercao,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      }).then((result) => {
        if (result.value) {
          nti.inserir(url, dom, evento);
        }
      });
    }
  };

  this.inserir = function (url, dom, evento) {
    $("#loading").show();
    var valores = nti.arrayToString(nti.ler_formulario("formEdicao"));
    nti.desabilitarBotao(dom, "Aguarde...");
    document.getElementById("conteudo").cursor = "wait";
    $("#erroGenerico").removeClass("ui-state-error ui-corner-all");
    $("#erroGenerico").html("");
    nti.limpar_formatacao("formEdicao");
    $.ajax({
      type: "POST",
      url: url + "/salvar",
      data: valores,
      cache: false,
      success: function (resultado) {
        $("#loading").hide();
        if (resultado == "") {
          return;
        }
        try {
          var retorno = resultado;
        } catch (error) {
          alert(
            "Ocorreu um erro no servidor.\nJá estamos trabalhando para corrigi-lo!"
          );
          console.log(resultado);
          nti.habilitarBotao(dom, "Salvar");
          return false;
        }
        if (nti.isArray(retorno)) {
          if (retorno[0] == "erro") {
            var generico = "";
            var lista = "";
            $("span[id^=erro]").html("");
            $(".error").removeClass("error");
            $(".inputErro").removeClass("inputErro");
            $("#mensagemErro").remove();
            for (var i in retorno[1]) {
              if (i.length > 1) {
                if (
                  $("#" + i)
                    .parent()
                    .hasClass("mdl-textfield") === true
                ) {
                  $("#" + i)
                    .parent()
                    .find("label")
                    .addClass("inputErro");
                } else {
                  $("#fk_" + i).addClass("fieldsetErro");
                  $("#fk_" + i + " .componente-modal-a").addClass("inputErro");
                }
                $("#erro-" + i)
                  .html(retorno[1][i])
                  .parent()
                  .addClass("inputErro");
                $("#" + i).addClass("inputErro");
                $("#descricao-" + i + " input").addClass("inputErro");
              } else {
                if (i == 0) {
                  generico = generico.concat(
                    '<h3 style="margin-top: 10px;">' + retorno[1][i] + "</h3>"
                  );
                } else {
                  lista = lista.concat(
                    "<li><strong>" + retorno[1][i] + "</strong></li>"
                  );
                }
              }
            }
            if (generico.length > 0) {
              $("html, body").animate(
                {
                  scrollTop: "0px",
                },
                300,
                function () {
                  var validacao = $("#validacao");
                  Swal.fire({
                    type: "error",
                    title:
                      "Não foi possível completar a ação.<br>Revise os campos na tela!",
                    html: lista,
                  });
                }
              );
            }
            nti.habilitarBotao(dom, "Salvar");
          } else if (retorno[0] == "ok") {
            nti.restaurar_formulario("formEdicao");
            Swal.fire({
              text: "Registro inserido com sucesso!",
              type: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK!",
            }).then((result) => {
              if (result.value) {
                var valor = retorno;
                var proxima_tela = valor[1].redirecionar;
                var chave = valor[1].id;
                var parametros = "";
                if (
                  typeof chave == "undefined" &&
                  typeof proxima_tela != "undefined"
                ) {
                  window.location = constantes.url + "/" + proxima_tela;
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros.length == 0
                ) {
                  if (proxima_tela.indexOf("/") != -1) {
                    window.location = proxima_tela + "/id/" + chave;
                  } else {
                    window.location =
                      constantes.url + "/" + proxima_tela + "/id/" + chave;
                  }
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros != "undefined"
                ) {
                  if (proxima_tela.indexOf("/") != -1) {
                    $.each(valor[1].parametros, function (k, v) {
                      parametros += "/param" + i + "/" + v;
                    });
                    window.location =
                      proxima_tela + "/id/" + chave + parametros;
                  } else {
                    var i = 1;
                    $.each(valor[1].parametros, function (k, v) {
                      parametros += "/param" + i + "/" + v;
                    });
                    window.location =
                      constantes.url +
                      "/" +
                      proxima_tela +
                      "/id/" +
                      chave +
                      parametros;
                  }
                } else {
                  window.location = constantes.url + "/listar";
                }
              }
            });
          }
        }
        document.getElementById("conteudo").cursor = "default";
      },
      error: function (data) {
        nti.salvarmensagemerro(data.responseText);
        $("#conteudo").append('<div id="mensagemErroSessao"></div>');
        $("#mensagemErroSessao").addClass(mensagem_alerta + " ui-corner-all");
        $("#mensagemErroSessao").html(
          '<strong>Erro no processamento das informações!</strong><br>Tente novamente e, se o problema persistir, abra um chamado de suporte clicando <a target="_blank" href="https://sigama.aged.ma.gov.br/chamado/abrir-chamado/inserir">aqui</a>.'
        );
        $("#mensagemErroSessao").dialog({
          resizable: false,
          height: 200,
          modal: true,
          title: "Mensagem do Erro",
          buttons: {
            Fechar: function () {
              window.location = "";
              $("#mensagem").dialog("destroy");
            },
          },
        });
        nti.habilitarBotao(dom, "Salvar");
        document.getElementById("conteudo").cursor = "default";
      },
    });
  };

  this.update = function (url, botao, evento) {
    $("#loading").show();
    $("#erroSalvar").remove();
    $("#divEdicao").prepend('<div id="erroSalvar"></div>');
    $("#erroGenerico").removeClass("ui-state-error ui-corner-all");
    $("#erroGenerico").html("");
    nti.limpar_formatacao("formEdicao");
    nti.desabilitarBotao(botao, "Aguarde...");
    document.getElementById("conteudo").cursor = "wait";

    var xmlRequest = $.ajax({
      type: "POST",
      url: url + "/update",
      data: nti.arrayToString(nti.ler_formulario("formEdicao")),
      cache: false,
      success: function (resultado) {
        $("#loading").hide();
        if (resultado == "") {
          return;
        }
        try {
          //var retorno = JSON.parse(resultado);
          var retorno = resultado;
        } catch (error) {
          alert(
            "Ocorreu um erro no servidor.\nJá estamos trabalhando para corrigí-lo!"
          );
          console.log(resultado);
          return false;
        }

        if (nti.isArray(retorno)) {
          // $('#bt_alterar').attr('disabled', false);
          if (retorno[0] == "erro") {
            var generico = "";
            var lista = "";
            $("span[id^=erro]").html("");
            $(".error").removeClass("error");
            $(".inputErro").removeClass("inputErro");
            $("#mensagemErro").remove();
            for (var i in retorno[1]) {
              if (i.length > 1) {
                if (
                  $("#" + i)
                    .parent()
                    .hasClass("mdl-textfield") === true
                ) {
                  $("#" + i)
                    .parent()
                    .find("label")
                    .addClass("inputErro");
                } else {
                  $("#fk_" + i).addClass("fieldsetErro");
                  $("#fk_" + i + " .componente-modal-a").addClass("inputErro");
                }
                $("#erro-" + i)
                  .html(retorno[1][i])
                  .parent()
                  .addClass("inputErro");
                $("#" + i).addClass("inputErro");
                $("#descricao-" + i + " input").addClass("inputErro");
              } else {
                if (i == 0) {
                  generico = generico.concat(
                    '<h3 style="margin-top: 10px;">' + retorno[1][i] + "</h3>"
                  );
                } else {
                  lista = lista.concat(
                    "<li><strong>" + retorno[1][i] + "</strong></li>"
                  );
                }
              }
            }
            if (generico.length > 0) {
              $("html, body").animate(
                {
                  scrollTop: "0px",
                },
                300,
                function () {
                  var validacao = $("#validacao");
                  Swal.fire({
                    type: "error",
                    title:
                      "Não foi possível completar a ação.<br>Revise os campos na tela!",
                    html: lista,
                  });
                }
              );
            }
            nti.habilitarBotao(botao, "Salvar");
          } else if (retorno[0] == "ok") {
            Swal.fire({
              text: "Registro alterado com sucesso!",
              type: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK!",
            }).then((result) => {
              if (result.value) {
                var valor = retorno;
                var proxima_tela = valor[1].redirecionar;
                var chave = valor[1].id;
                var parametros = "";
                this.disabled = false;
                var valor = retorno;
                var proxima_tela = valor[1].redirecionar;
                var chave = valor[1].id;
                var parametros = "";
                if (
                  typeof chave == "undefined" &&
                  typeof proxima_tela != "undefined"
                ) {
                  window.location = constantes.url + "/" + proxima_tela;
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros.length == 0
                ) {
                  if (proxima_tela.indexOf("/") != -1) {
                    window.location = proxima_tela + "/id/" + chave;
                  } else {
                    window.location =
                      constantes.url + "/" + proxima_tela + "/id/" + chave;
                  }
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros != "undefined"
                ) {
                  if (proxima_tela.indexOf("/") != -1) {
                    $.each(valor[1].parametros, function (k, v) {
                      parametros += "/param" + i + "/" + v;
                    });
                    window.location =
                      proxima_tela + "/id/" + chave + parametros;
                  } else {
                    var i = 1;
                    $.each(valor[1].parametros, function (k, v) {
                      parametros += "/param" + i + "/" + v;
                    });
                    window.location =
                      constantes.url +
                      "/" +
                      proxima_tela +
                      "/id/" +
                      chave +
                      parametros;
                  }
                } else {
                  /** Se não tiver nenhuma resposta sobre redirecionamento, envia pra lista*/
                  window.location = constantes.url + "/listar";
                }
                $(this).dialog("close");
              }
            });
          } else {
            $("#erroSalvar").addClass("ui-state-error ui-corner-all");
            $("#erroSalvar").html(resultado);
            nti.habilitarBotao(botao, "Salvar");
          }
        }
        document.getElementById("conteudo").cursor = "default";
      },
      error: function (data) {
        nti.salvarmensagemerro(data.responseText);
        $("#conteudo").append('<div id="mensagemErroSessao"></div>');
        $("#mensagemErroSessao").addClass(mensagem_alerta + " ui-corner-all");
        $("#mensagemErroSessao").html(
          '<strong>Erro no processamento das informações!</strong><br>Tente novamente e, se o problema persistir, abra um chamado de suporte clicando <a target="_blank" href="https://sigama.aged.ma.gov.br/chamado/abrir-chamado/inserir">aqui</a>.'
        );
        $("#mensagemErroSessao").dialog({
          resizable: false,
          height: 200,
          modal: true,
          title: "Mensagem do Erro",
          buttons: {
            Fechar: function () {
              window.location = "";
              $("#mensagem").dialog("destroy");
            },
          },
        });
        document.getElementById("conteudo").cursor = "default";
      },
      notmodified: function () {},
      timeout: function () {},
      abort: function () {},
    });

    xmlRequest.fail(function (textStatus) {
      $("#erroSalvar").addClass("ui-state-error ui-corner-all");
      $("#erroSalvar").html(textStatus);
    });
  };

  this.limparInclusao = function () {
    $("#conteudo").append('<div id="mensagem"></div>');
    $("#mensagem").addClass(mensagem_alerta + " ui-corner-all");
    $("#mensagem").html("Deseja limpar conteúdo dos campos?");
    $("#mensagem").dialog({
      resizable: false,
      height: 200,
      modal: true,
      title: "Mensagem do Sistema",
      buttons: {
        Confirmar: function () {
          window.location = constantes.url + "/inserir";
          $("#mensagem").dialog("destroy");
        },
        Fechar: function () {
          $("#mensagem").dialog("destroy");
        },
      },
    });
  };
  this.limparVisualizacao = function () {
    $("#conteudo").append('<div id="mensagem"></div>');
    $("#mensagem").addClass(mensagem_alerta + " ui-corner-all");
    $("#mensagem").html("Deseja limpar conteúdo dos campos?");
    $("#mensagem").dialog({
      resizable: false,
      height: 200,
      modal: true,
      title: "Mensagem do Sistema",
      buttons: {
        Confirmar: function () {
          window.location = constantes.url + "/visualizar";
          $("#mensagem").dialog("destroy");
        },
        Fechar: function () {
          $("#mensagem").dialog("destroy");
        },
      },
    });
  };

  this.mensagemSucesso = function (mensagem) {
    $("#dialog:ui-dialog").dialog("close");
    $("#boxDelete").html(mensagem);
    $("#boxDelete").dialog({
      resizable: false,
      height: 150,
      height: 200,
      modal: true,
      title: "",
      buttons: {
        Ok: function () {
          $(this).dialog("close");
        },
      },
    });
  };

  this.detalhar = function (registro, rotina, options) {
    var options = options || {};
    var width = options.width || 425;
    var height = options.height || 425;

    $("#boxDetalhar").dialog({
      resizable: true,
      width: width,
      height: height,
      modal: true,
      closeOnEscape: false,
      title:
        '<i class="mdi mdi-dialog mdi-magnify-plus-outline" style="font-size: 16px !important;"></i>Detalhamento',
      buttons: {
        Fechar: function () {
          $(this).find("#tabelaDetalhar").children().remove();
          $(this).dialog().dialog("close");
          $(this).dialog().dialog("destroy");
        },
      },
    });

    $(".ui-dialog-titlebar-close").remove();
    $("#boxDetalhar #loading").show();

    $.ajax({
      type: "POST",
      url: registro,
      data: "",
      success: function (resultado) {
        $("#boxDetalhar #tabelaDetalhar").html(resultado);
        $("#boxDetalhar #loading").hide();
      },
    });
  };

  this.desabilitarBotao = function (dom, textoBotao = "Aguarde...") {
    document.getElementById(dom.name).disabled = true;
    document.getElementById(dom.name).innerText = textoBotao;
  };

  this.habilitarBotao = function (dom, textoBotao = "Salvar") {
    $("#" + dom.name).removeAttr("disabled");
    document.getElementById(dom.name).disabled = false;
    document.getElementById(dom.name).innerText = textoBotao;
  };

  this.preview = function (url, dom) {
    $("#loading").show();
    nti.desabilitarBotao(dom, "Aguarde...");
    $("#erroGenerico").hide();
    $("#erroGenerico").html("");
    var dados = nti.arrayToString(nti.ler_formulario("formEdicao"));
    $.ajax({
      type: "POST",
      url: nti.url + "/charque",
      data: "",
      cache: false,
      success: function (resultado) {
        if (resultado == "") return;
        var salt = eval(resultado);
        if (nti.isArray(salt)) {
          if (salt[0] == "erro") {
            $("#erroGenerico").html(
              '<div class="agr-notification-error" style="margin-top: 20px; padding: 12px;"><p><i class="material-icons agr-font-20px">info_outline</i><strong>Erro ao tentar acessar servidor para login</strong></p></div>'
            );
          } else if (salt[0] == "ok") {
            var seed = nti.md5(nti.getValorSessao() + salt[1][0]);
            $.ajax({
              type: "GET",
              url: url + "/validar",
              data: dados,
              cache: false,
              success: function (resultado) {
                if (resultado == "") {
                  return;
                }
                var retorno = eval(resultado);
                if (nti.isArray(retorno)) {
                  if (retorno[0] == "erro") {
                    $("#loading").hide();
                    nti.habilitarBotao(dom, "Visualizar");
                    $("span[id^=erro]").html("");
                    $(".error").removeClass("error");
                    $(".inputErro").removeClass("inputErro");
                    $("#erroGenerico").hide();
                    var generico = "";
                    for (var i in retorno[1]) {
                      if (i.length > 1) {
                        $("#erro-" + i).html(retorno[1][i]);
                        $("#" + i).addClass("inputErro");
                        $("#" + i)
                          .parent()
                          .find("label")
                          .addClass("inputErro");
                      } else {
                        generico = generico.concat(
                          "<li>" + retorno[1][i] + "</li>"
                        );
                      }
                      $("#erro-" + i)
                        .html(retorno[1][i])
                        .parent()
                        .addClass("inputErro");
                      $("#" + i).addClass("inputErro");
                      $("#descricao-" + i + " input").addClass("inputErro");
                    }
                    if (generico.length > 0) {
                      $("#erroGenerico").show();
                      $("#erroGenerico").html(generico);
                      $("#erroAviso").html(generico);
                    }
                  } else if (retorno[0] === "ok") {
                    var url = nti.url + "/relatorio?";
                    var dados =
                      nti.arrayToString(nti.ler_formulario("formEdicao")) +
                      "&erl=" +
                      seed +
                      "&nam=" +
                      salt[1][1];
                    $("#formEdicao").submit(dados);
                    window.open(url + dados, "_self");
                  }
                }
              },
            });
          }
        } else {
          $("#erroGenerico").html(
            '<div class="agr-notification-error" style="margin-top: 20px; padding: 12px;"><p><i class="material-icons agr-font-20px">info_outline</i><strong>Erro ao tentar acessar chave do servidor</strong></p></div>'
          );
        }
      },
      error: function (resultado) {
        console.log(resultado);
      },
    });
  };

  this.carregarPesquisa = function (rotina) {
    $("#boxPesquisar").load(rotina);
    $("#boxPesquisar").accordion("option", "active", 0);
  };

  this.carregarFiltro = function (rotina) {};

  this.procurar = function (rotina) {
    var sucesso = function ($resultado) {
      $("#accordionListar").accordion({
        autoHeight: false,
        active: 1,
        navigation: true,
      });

      $("#boxPesquisar").html($resultado);
    };

    $.post("listar", $("#formPesquisar").serialize(), sucesso);
  };
  this.removerArquivo = function (idArquivo) {
    var texto = "Tem certeza que deseja apagar esse arquivo?";
    $("#mensagemArquivo").remove();
    $("#conteudo").append('<div id="mensagemArquivo"></div>');
    $("#mensagemArquivo").addClass("ui-state-highlight  ui-corner-all");
    $("#mensagemArquivo").html(texto);
    $("#mensagemArquivo").dialog({
      resizable: false,
      height: 200,
      modal: true,
      title: "Mensagem de Alerta",
      buttons: {
        Confirmar: function () {
          /* Envia comando para arquivo ser apagado no banco de dados */
          $('<div id="inativar"></div>').load(
            nti.url + "/apagar-arquivo/id/" + idArquivo,
            function (resposta) {
              $("#tr_" + idArquivo).remove();
            }
          );
          $("#mensagemArquivo").dialog("destroy");
        },
        Fechar: function () {
          $("#mensagemArquivo").dialog("destroy");
        },
      },
    });
  };

  this.selectDependente = function (
    pai,
    filho,
    funcao,
    id,
    descricao,
    params,
    paramsDinamicos
  ) {
    var dataString =
      "string=" +
      $("#" + pai).val() +
      "&funcao=" +
      funcao +
      "&id=" +
      id +
      "&descricao=" +
      descricao +
      "";
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        dataString += "&" + key + "=" + params[key];
      }
    }
    for (var key in paramsDinamicos) {
      if (paramsDinamicos.hasOwnProperty(key)) {
        dataString += "&" + key + "=" + $("#" + paramsDinamicos[key]).val();
      }
    }
    $.ajax({
      type: "POST",
      url: this.url + "/selectdependente",
      data: dataString,
      cache: false,
      success: function (resultado) {
        var posicaoChecagemVazio = resultado.indexOf("</option>&");
        if (posicaoChecagemVazio == -1) {
          $("select#" + filho)
            .removeAttr("disabled")
            .html(resultado)
            .trigger("liszt:updated");
        } else {
          $("select#" + filho)
            .attr("disabled", "disabled")
            .html(resultado);
        }
      },
    });
  };

  this.selectDependenteMultiplo = function (
    pai1,
    pai2,
    filho,
    funcao,
    id,
    descricao,
    params,
    paramsDinamicos
  ) {
    var dataString =
      "string1=" +
      $("#" + pai1).val() +
      "&string2=" +
      $("#" + pai2).val() +
      "&filho=" +
      filho +
      "&funcao=" +
      funcao +
      "&id=" +
      id +
      "&descricao=" +
      descricao +
      "";
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        dataString += "&" + key + "=" + params[key];
      }
    }
    for (var key in paramsDinamicos) {
      if (paramsDinamicos.hasOwnProperty(key)) {
        dataString += "&" + key + "=" + $("#" + paramsDinamicos[key]).val();
      }
    }
    $.ajax({
      type: "POST",
      url: this.url + "/selectdependentemultiplo",
      data: dataString,
      cache: false,
      success: function (resultado) {
        var posicaoChecagemVazio = resultado.indexOf("</option>&");
        if (posicaoChecagemVazio == -1) {
          $("select#" + filho)
            .removeAttr("disabled")
            .html(resultado)
            .trigger("liszt:updated");
        } else {
          $("select#" + filho)
            .attr("disabled", "disabled")
            .html(resultado);
        }
      },
    });
  };

  //  this.selectDependenteAutoComplete = function( pai, filho, funcao) {
  //
  //        var dataString = 'string='+ $('#'+pai).val()+'&funcao='+funcao;
  //        $.ajax({
  //            type: "POST",
  //            url: this.url+"/selectdependenteautocomplete",
  //            data: dataString,
  //            cache: false,
  //            success: function(resultado)
  //            {
  //                $('#'+filho).html(resultado);
  //            }
  //        });
  //    }

  this.preencherSelect = function (select, valores) {
    var elm = $("#" + select).get(0);

    elm.options.length = 0;
    for (var i = 0; i < valores.length - 1; i += 2) {
      elm.options[elm.length] = new Option(valores[i + 1], valores[i]);
    }
    elm.value = valores[valores.length - 1];
  };

  this.retornar = function () {
    history.back();
  };

  this.login = function (url, usuario, psw) {
    $("#loading").show();
    var endereco = constantes.base_url + "application/index/charque";
    $.ajax({
      type: "POST",
      url: endereco,
      data: "",
      cache: false,
      success: function (resultado) {
        if (resultado == "") return;
        var retorno = eval(resultado);
        if (nti.isArray(retorno)) {
          if (retorno[0] == "erro") {
            $("#erroGenerico").html(
              '<div class="agr-notification-error" style="margin-top: 20px; padding: 12px;"><p><i class="material-icons agr-font-20px">info_outline</i><strong>Erro ao tentar acessar servidor para login</strong></p></div>'
            );
          } else if (retorno[0] == "ok") {
            var crypto = nti.md5($("#" + psw).val());
            var usuario = $("#usuario").val();
            var dados =
              "password=" +
              crypto +
              "&seed=" +
              retorno[1][1] +
              "&login=" +
              usuario;
            $.ajax({
              type: "POST",
              url: constantes.base_url + "application/index/autenticacao",
              data: dados,
              cache: false,
              success: function (resultado_login) {
                var ar_resultado = eval(resultado_login);

                if ($.isArray(ar_resultado)) {
                  if (ar_resultado[1] == "email") {
                    $("#loading").hide();
                    $("#boxEmail").html(
                      "\
                                            <div class='control-group'>\
                                                <label>Informe um EMAIL pessoal duas vezes.<br>Este email será utilizado para a sua RECUPERAÇÃO de SENHA e demais avisos do SIGAMA.</label>\
                                            </div><br>\
                                            <div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty' data-upgraded=',MaterialTextfield'>\
                                                <input type='text' id='email' name='email' class='mdl-textfield__input'/>\
                                                <label class='mdl-textfield__label'>Email</label>\
                                            </div><br>\
                                            <div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty' data-upgraded=',MaterialTextfield'>\
                                                <input type='text' id='emailverificacao' name='emailverificacao' oncopy='return false;' onpaste='return false;' oncut='return false;' class='mdl-textfield__input'/>\
                                                <label class='mdl-textfield__label'>Digite o email novamente</label>\
                                            </div>"
                    );
                    $("#boxEmail").dialog({
                      resizable: true,
                      height: "auto",
                      width: "auto",
                      modal: true,
                      title: "Digite seu email",
                      buttons: {
                        Confirmar: function () {
                          var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                          var email = $("#email").val();
                          var emailverificacao = $("#emailverificacao").val();
                          if (email == "" || !emailReg.test(email)) {
                            alert("Informe seu email corretamente");
                            $("#email").focus();
                            return false;
                          }
                          if (email != emailverificacao) {
                            alert("O email de verificação não confere!");
                            $("#emailverificacao").focus();
                            return false;
                          }
                          $.ajax({
                            type: "POST",
                            url:
                              constantes.base_url +
                              "application/index/alteraremail",
                            data: {
                              usuario: usuario,
                              email: email,
                            },
                            success: function (resultado) {
                              if (resultado.status == 500) {
                                alert(resultado.message);
                              } else if (resultado.status == 200) {
                                alert(
                                  resultado.message +
                                    "\nClique em OK e aguarde ser redirecionado!"
                                );
                                $("#boxEmail").dialog("close");
                                nti.login(url, "usuario", "senha");
                              }
                            },
                          });
                        },
                      },
                    });
                  } else if (ar_resultado[0] == "erro") {
                    if (ar_resultado[1] == "mudarSenha") {
                      window.location.replace(
                        constantes.http_server + "application/index/minhasenha"
                      );
                    } else {
                      $("#loading").hide();
                      Swal.fire({
                        type: "error",
                        timer: 4000,
                        html: ar_resultado[1],
                      });
                    }
                  } else if (ar_resultado[1] == "erro") {
                    $("#loading").hide();
                    Swal.fire({
                      type: "error",
                      timer: 4000,
                      html: ar_resultado[1],
                    });
                  } else if (ar_resultado[0] == "ok") {
                    window.name = nti.getValorSessao();
                    window.location =
                      constantes.base_url + "application/index/home";
                  }
                }
              },
            });
          } else {
            $("#loading").hide();
            $("#erroGenerico").html(
              '<div class="agr-notification-error" style="margin-top: 20px; padding: 12px;"><p><i class="material-icons agr-font-20px">info_outline</i><strong>Erro ao tentar acessar chave do servidor</strong></p></div>'
            );
          }
        }
      },
      error: function (resultado) {
        console.log(resultado);
      },
    });
  };

  this.abrir = function (pagina) {
    window.open(pagina, "_self");
  };

  this.sair = function (pagina) {
    if (confirm("Tem certeza que deseja sair do Sidago?")) {
      window.open(pagina, "_self");
    } else {
      return false;
    }
  };

  this.abrirFK = function (pagina, titulo, id, width) {
    $("#div_" + id).load(pagina, function () {
      $("#div_" + id).dialog({
        resizable: false,
        width: width,
        modal: true,
        title: titulo,
        buttons: {
          Confirmar: function () {
            var valor = $("#div_" + id + "> #" + id).val();
            $("#" + id).attr("value", $("#" + id).val() + valor + ";");

            var conteudo = $("<div></div>").load(
              "" + pagina + "-ficha/id/" + valor
            );
            $("#ficha_" + id).append(conteudo);
            $("#div_" + id).dialog("close");
          },
          Fechar: function () {
            $("#div_" + id).dialog("close");
          },
          /** "Fechar": function() {$( this ).dialog( "close" ); } */
        },
      });
    });
  };

  this.abrirJanelaPdf = function (e, titulo) {
    e.preventDefault();
    $("#div_pdf").dialog({
      resizable: false,
      width: "80%",
      maxWidth: 1200,
      height: 800,
      modal: true,
      title: titulo,
      buttons: {
        Fechar: function () {
          $("#div_pdf").dialog("close");
        },
      },
    });
  };

  var controleAdicionarFormModal = 0;
  var idFkAnterior = 0;
  this.abrirFormModalBox = function (
    idTr,
    pagina,
    titulo,
    id,
    width,
    height,
    dados,
    options,
    params,
    paramsDinamicos,
    editando
  ) {
    if (
      editando == false &&
      options["somenteVisualizar"] == true &&
      $("#tb_" + id + " tr").size() > 0
    ) {
      var mensagem = "Não é possível inserir mais itens.";
      $("#erroGenerico").addClass("ui-state-highlight ui-corner-all");
      $("#erroGenerico").html(mensagem);
      $("#erroGenerico").dialog({
        height: 300,
        width: 400,
        modal: true,
        title: "Alerta",
        buttons: {
          Ok: function () {
            $("#erroGenerico").dialog("destroy");
          },
        },
      });
      return;
    }

    var params = params || "";
    if (paramsDinamicos.length == 0) {
      novosParamsDinamicos = {};
    } else {
      novosParamsDinamicos = $.deparam(paramsDinamicos);
    }
    var dados_json = "";
    if ($.isArray(dados)) {
      dados_json = dados.join("&");
    } else {
      dados_json = dados;
    }
    if (params.length > 0) {
      dados_json += "&" + params;
    }
    for (var key in novosParamsDinamicos) {
      if (novosParamsDinamicos.hasOwnProperty(key)) {
        if ($("#" + novosParamsDinamicos[key]).val().length == 0) {
          if (options.validarParamsVazios) {
            $("#erroGenerico").addClass("ui-state-highlight ui-corner-all");
            $("#erroGenerico").html(
              "Existem campos a serem preenchidos antes de adicionar estes dados. Favor preenchê-los e tentar novamente."
            );
            $("#erroGenerico").dialog({
              height: 200,
              width: 400,
              modal: true,
              title: "Mensagem de Erro",
              buttons: {
                Ok: function () {
                  $("#erroGenerico").dialog("close");
                },
              },
            });
            $(".inputErro").removeClass("inputErro");
            $("#" + novosParamsDinamicos[key])
              .parent()
              .find("label")
              .addClass("inputErro");
            $("#" + novosParamsDinamicos[key])
              .parent()
              .find("input")
              .addClass("inputErro");
          }
          return;
        }
        dados_json +=
          "&" + key + "=" + $("#" + novosParamsDinamicos[key]).val();
      }
    }
    if (!nti.check_integer(width)) {
      width = 400;
    }
    if (!nti.check_integer(height)) {
      height = "auto";
    }

    $("#" + id + "-loading").show();

    var xmlRequest = $.ajax({
      type: "POST",
      url: constantes.url + "/" + pagina,
      data: dados_json,
      success: function (html_ficha) {
        $("#" + id + "-loading").hide();
        $("#div_" + id).empty();
        $("#div_" + id).append(html_ficha);
        $("#div_" + id).dialog({
          resizable: false,
          width: width,
          height: height,
          modal: true,
          title: titulo,
          close: function (event, ui) {
            $("#div_" + id)
              .dialog()
              .dialog("destroy");
          },
          buttons: {
            Confirmar: function () {
              this.disabled = true;
              var stt = nti.ler_formulario("form_" + id);
              var valores = nti.arrayToString(stt);

              $.ajax({
                type: "POST",
                url: constantes.url + "/" + pagina + "Validar",
                data: valores,
                cache: false,
                success: function (validado) {
                  var retorno = eval(validado);
                  if (retorno[0] == "erro") {
                    var mensagem = "";
                    for (var i = 0; i < retorno[1].length; ++i) {
                      var valor = retorno[1][i];
                      if (typeof valor != "undefined") {
                        mensagem += "<li>" + valor + "</li>";
                      }
                    }
                    this.disabled = false;
                    $("#erroGenerico").addClass(
                      "ui-state-highlight ui-corner-all"
                    );
                    $("#erroGenerico").html(mensagem);
                    $("#erroGenerico").dialog({
                      height: 300,
                      width: 400,
                      modal: true,
                      title: "Mensagem de Erro",
                      buttons: {
                        Ok: function () {
                          $("#erroGenerico").dialog("close");
                        },
                      },
                    });
                  } else if (retorno[0] == "ok") {
                    $("#erro-" + id).html("");
                    $("#" + id)
                      .siblings("fieldset")
                      .removeClass("fieldsetErro");
                    /** Checa se a tela foi chamada a partir de alterar */

                    if ($.isArray(dados)) {
                      oid = nti.getOidInArray(dados);
                      stt.oid = nti.getOidInArray(dados);
                    } else {
                      stt.oid = nti.criarOidHtml();
                    }
                    /** armazena valores num componente hidden do form */
                    nti.armazenarObjeto(stt, id);
                    /** Envia dados para serem renderizados no form principal */
                    $.ajax({
                      type: "POST",
                      url: constantes.url + "/" + pagina + "Ficha",
                      data: valores,
                      cache: false,
                      success: function (dado) {
                        var linha = nti.adicionarItemNaFicha(
                          pagina,
                          id,
                          stt.oid,
                          dado,
                          width,
                          height,
                          options,
                          params,
                          paramsDinamicos
                        );
                        var dom = "#tb_" + id + " tbody";
                        if (idTr != "") {
                          $("tr#" + idTr).remove();
                        }
                        if (id !== idFkAnterior) {
                          controleAdicionarFormModal = 0;
                        }
                        idFkAnterior = id;
                        if (
                          options.saidaTabela &&
                          $("#" + id + "_inclusao").val() == "1"
                        ) {
                          if (controleAdicionarFormModal == "0") {
                            var betweenHead = dado
                              .split("<thead>")
                              .pop()
                              .split("</thead>")
                              .shift();
                            var cabecalho = betweenHead.replace(
                              "</tr>",
                              "<td colspan='2' align='center'>#</td></tr>"
                            );
                            $(dom).append(cabecalho);
                          }
                          controleAdicionarFormModal++;
                        }
                        $(dom).append(linha);
                      },
                    });
                    $("#div_" + id)
                      .dialog()
                      .dialog("close");
                    $("#div_" + id)
                      .dialog()
                      .dialog("destroy");
                  }
                },
                error: function () {
                  alert("error");
                },
                notmodified: function () {
                  alert("notmodified");
                },
                timeout: function () {
                  alert("timeout");
                },
                abort: function () {
                  alert("abort");
                },
              });
            },
            Fechar: function () {
              $(this).dialog("close");
              $("#div_" + id)
                .dialog()
                .dialog("destroy");
              $("#div_" + id)
                .children()
                .remove();
            },
          },
        });
      },
    });

    xmlRequest.done(function (msg) {
      $("#log").html(msg);
    });

    xmlRequest.fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  };

  this.abrirFormModalBoxFixo = function (pagina, titulo, id, width, dados) {
    /* Caso haja dados, formatar array para string*/
    var dados_json = "";

    if ($.isArray(dados)) {
      dados_json = dados.join("&");
    }

    /* Verifica tamanho da janela */
    if (!nti.check_integer(width)) {
      width = 400;
    }
    width = 800;

    $("#" + id + "-loading").show();

    var xmlRequest = $.ajax({
      type: "POST",
      url: constantes.url + "/" + pagina,
      data: dados_json,
      success: function (html_ficha) {
        $("#" + id + "-loading").hide();
        $("#div_" + id).empty();
        $("#div_" + id).append(html_ficha);
        $("#div_" + id).dialog({
          resizable: false,
          width: width,
          modal: true,
          title: titulo,
          close: function (event, ui) {
            $("#div_" + id)
              .dialog()
              .dialog("destroy");
          },
          buttons: {
            Confirmar: function () {
              this.disabled = true;
              var stt = nti.ler_formulario("form_" + id);
              var valores = nti.arrayToString(stt);

              /** Faz validação dos dados */
              $.ajax({
                type: "POST",
                url: constantes.url + "/" + pagina + "Validar",
                data: valores,
                cache: false,
                success: function (validado) {
                  var retorno = eval(validado);
                  if (retorno[0] == "erro") {
                    var mensagem = "";
                    /** Se a validação não retornou um sucesso */
                    for (var i = 0; i < retorno.length; ++i) {
                      var valor = retorno[1][i];
                      if (typeof valor != "undefined") {
                        mensagem += "<p>" + valor + "</p>";
                      }
                    }
                    this.disabled = false;
                    $("#erroGenerico").addClass(
                      "ui-state-highlight ui-corner-all"
                    );
                    $("#erroGenerico").addClass(
                      "margin-top: 20px; padding: 12px;"
                    );
                    /** @todo passar estilo para uma classe e public*/
                    $("#erroGenerico").html(mensagem);
                    $("#erroGenerico").dialog({
                      height: 300,
                      width: 400,
                      modal: true,
                      title: "Mensagem de Erro",
                      buttons: {
                        Ok: function () {
                          $("#erroGenerico").dialog("close");
                        },
                      },
                    });
                  } else if (retorno[0] == "ok") {
                    /** Se o dado do fk for válido */

                    /** Checa se a tela foi chamada a partir de alterar */
                    if ($.isArray(dados)) {
                      oid = nti.getOidInArray(dados);
                      stt.oid = nti.getOidInArray(dados);
                    } else {
                      stt.oid = nti.criarOidHtml();
                    }

                    /** armazena valores num componente hidden do form */
                    nti.armazenarObjeto(stt, id);

                    /** Envia dados para serem renderizados no form principal */
                    $.ajax({
                      type: "POST",
                      url: constantes.url + "/" + pagina + "Ficha",
                      data: valores,
                      cache: false,
                      success: function (dado) {
                        nti.adicionarItemNaFichaBoxFixo(
                          pagina,
                          id,
                          stt.oid,
                          dado
                        );
                      },
                    });
                    $("#div_" + id)
                      .dialog()
                      .dialog("close");
                    $("#div_" + id)
                      .dialog()
                      .dialog("destroy");
                  }
                },
                error: function () {
                  alert("error");
                },
                notmodified: function () {
                  alert("notmodified");
                },
                timeout: function () {
                  alert("timeout");
                },
                abort: function () {
                  alert("abort");
                },
              });
            },
            Fechar: function () {
              $("#div_" + id)
                .dialog()
                .dialog("destroy");
              $("#div_" + id)
                .children()
                .remove();
            },
          },
        });
      },
    });

    xmlRequest.done(function (msg) {
      $("#log").html(msg);
    });

    xmlRequest.fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  };

  this.abrirFormModalBoxSemAlterar = function (
    pagina,
    titulo,
    id,
    width,
    height,
    dados
  ) {
    /* Caso haja dados, formatar array para string*/
    var dados_json = "";

    if ($.isArray(dados)) {
      dados_json = dados.join("&");
    }

    /* Verifica tamanho da janela */
    if (!nti.check_integer(width)) {
      width = 400;
    }
    if (!nti.check_integer(height)) {
      height = 400;
    }

    var xmlRequest = $.ajax({
      type: "POST",
      url: constantes.url + "/" + pagina,
      data: dados_json,
      success: function (html_ficha) {
        $("#div_" + id).empty();
        $("#div_" + id).append(html_ficha);
        $("#div_" + id).dialog({
          resizable: false,
          width: width,
          height: height,
          modal: true,
          title: titulo,
          close: function (event, ui) {
            $("#div_" + id)
              .dialog()
              .dialog("destroy");
          },
          buttons: {
            Confirmar: function () {
              this.disabled = true;
              var stt = nti.ler_formulario("form_" + id);
              var valores = nti.arrayToString(stt);

              /** Faz validação dos dados */
              $.ajax({
                type: "POST",
                url: constantes.url + "/" + pagina + "Validar",
                data: valores,
                cache: false,
                success: function (validado) {
                  var retorno = eval(validado);
                  if (retorno[0] == "erro") {
                    var mensagem = "";
                    /** Se a validação não retornou um sucesso */
                    for (var i = 0; i < retorno.length; ++i) {
                      var valor = retorno[1][i];
                      if (typeof valor != "undefined") {
                        mensagem += "<p>" + valor + "</p>";
                      }
                    }
                    this.disabled = false;
                    $("#erroGenerico").addClass(
                      "ui-state-highlight ui-corner-all"
                    );
                    $("#erroGenerico").addClass(
                      "margin-top: 20px; padding: 12px;"
                    );
                    /** @todo passar estilo para uma classe e public*/
                    $("#erroGenerico").html(mensagem);
                    $("#erroGenerico").dialog({
                      height: 300,
                      width: 400,
                      modal: true,
                      title: "Mensagem de Erro",
                      buttons: {
                        Ok: function () {
                          $("#erroGenerico").dialog().dialog("close");
                        },
                      },
                    });
                  } else if (retorno[0] == "ok") {
                    /** Se o dado do fk for válido */

                    /** Checa se a tela foi chamada a partir de alterar */
                    if ($.isArray(dados)) {
                      oid = nti.getOidInArray(dados);
                      stt.oid = nti.getOidInArray(dados);
                    } else {
                      stt.oid = nti.criarOidHtml();
                    }

                    /** armazena valores num componente hidden do form */
                    nti.armazenarObjeto(stt, id);

                    /** Envia dados para serem renderizados no form principal */
                    $.ajax({
                      type: "POST",
                      url: constantes.url + "/" + pagina + "Ficha",
                      data: valores,
                      cache: false,
                      success: function (dado) {
                        nti.adicionarItemNaFichaBoxSemAlterar(
                          pagina,
                          id,
                          stt.oid,
                          dado
                        );
                      },
                    });
                    $("#div_" + id)
                      .dialog()
                      .dialog("close");
                    $("#div_" + id)
                      .dialog()
                      .dialog("destroy");
                  }
                },
                error: function () {
                  alert("error");
                },
                notmodified: function () {
                  alert("notmodified");
                },
                timeout: function () {
                  alert("timeout");
                },
                abort: function () {
                  alert("abort");
                },
              });
            },
            Fechar: function () {
              $("#div_" + id)
                .dialog()
                .dialog("destroy");
              $("#div_" + id)
                .children()
                .remove();
            },
          },
        });
      },
    });

    xmlRequest.done(function (msg) {
      $("#log").html(msg);
    });

    xmlRequest.fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  };

  this.preencherAlterarFkBoxSemAlterar = function (nome_fk, valores, id) {
    valores += "&database=true"; //indica que registro é oriundo do banco de dados
    valores = nti.stringToArray(valores);

    /** Adicionar oid ao registro fk */
    valores.oid = nti.criarOidHtml();

    /** armazena valores do form */
    nti.armazenarObjeto(eval(valores), id);

    /** Envia dados para serem renderizados no form principal */
    $.ajax({
      type: "POST",
      url: constantes.url + "/" + nome_fk + "Ficha",
      data: nti.arrayToString(valores),
      cache: false,
      success: function (dado) {
        nti.adicionarItemNaFichaBoxSemAlterar(nome_fk, id, valores.oid, dado);
      },
    });
  };
  this.abrirFormModalBoxSemExcluir = function (
    pagina,
    titulo,
    id,
    width,
    dados
  ) {
    /* Caso haja dados, formatar array para string*/
    var dados_json = "";

    if ($.isArray(dados)) {
      dados_json = dados.join("&");
    }

    /* Verifica tamanho da janela */
    if (!nti.check_integer(width)) {
      width = 400;
    }

    $("#" + id + "-loading").show();

    var xmlRequest = $.ajax({
      type: "POST",
      url: constantes.url + "/" + pagina,
      data: dados_json,
      success: function (html_ficha) {
        $("#" + id + "-loading").hide();
        $("#div_" + id).empty();
        $("#div_" + id).append(html_ficha);
        $("#div_" + id).dialog({
          resizable: false,
          width: width,
          modal: true,
          title: titulo,
          close: function (event, ui) {
            $("#div_" + id)
              .dialog()
              .dialog("destroy");
          },
          buttons: {
            Confirmar: function () {
              this.disabled = true;
              var stt = nti.ler_formulario("form_" + id);
              var valores = nti.arrayToString(stt);

              /** Faz validação dos dados */
              $.ajax({
                type: "POST",
                url: constantes.url + "/" + pagina + "Validar",
                data: valores,
                cache: false,
                success: function (validado) {
                  var retorno = eval(validado);
                  if (retorno[0] == "erro") {
                    var mensagem = "";
                    /** Se a validação não retornou um sucesso */
                    for (var i = 0; i < retorno.length; ++i) {
                      var valor = retorno[1][i];
                      if (typeof valor != "undefined") {
                        mensagem += "<p>" + valor + "</p>";
                      }
                    }
                    this.disabled = false;
                    $("#erroGenerico").addClass(
                      "ui-state-highlight ui-corner-all"
                    );
                    $("#erroGenerico").addClass(
                      "margin-top: 20px; padding: 12px;"
                    );
                    /** @todo passar estilo para uma classe e public*/
                    $("#erroGenerico").html(mensagem);
                    $("#erroGenerico").dialog({
                      height: 300,
                      width: 400,
                      modal: true,
                      title: "Mensagem de Erro",
                      buttons: {
                        Ok: function () {
                          $("#erroGenerico").dialog("close");
                        },
                      },
                    });
                  } else if (retorno[0] == "ok") {
                    /** Se o dado do fk for válido */

                    /** Checa se a tela foi chamada a partir de alterar */
                    if ($.isArray(dados)) {
                      oid = nti.getOidInArray(dados);
                      stt.oid = nti.getOidInArray(dados);
                    } else {
                      stt.oid = nti.criarOidHtml();
                    }

                    /** armazena valores num componente hidden do form */
                    nti.armazenarObjeto(stt, id);

                    /** Envia dados para serem renderizados no form principal */
                    $.ajax({
                      type: "POST",
                      url: constantes.url + "/" + pagina + "Ficha",
                      data: valores,
                      cache: false,
                      success: function (dado) {
                        nti.adicionarItemNaFichaBoxSemExcluir(
                          pagina,
                          id,
                          stt.oid,
                          dado
                        );
                      },
                    });
                    $("#div_" + id)
                      .dialog()
                      .dialog("close");
                    $("#div_" + id)
                      .dialog()
                      .dialog("destroy");
                  }
                },
                error: function () {
                  alert("error");
                },
                notmodified: function () {
                  alert("notmodified");
                },
                timeout: function () {
                  alert("timeout");
                },
                abort: function () {
                  alert("abort");
                },
              });
            },
            Fechar: function () {
              $("#div_" + id)
                .dialog()
                .dialog("destroy");
              $("#div_" + id)
                .children()
                .remove();
            },
          },
        });
      },
    });

    xmlRequest.done(function (msg) {
      $("#log").html(msg);
    });

    xmlRequest.fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  };
  this.preencherAlterarFkBoxSemExcluir = function (nome_fk, valores, id) {
    valores += "&database=true"; //indica que registro é oriundo do banco de dados
    valores = nti.stringToArray(valores);

    /** Adicionar oid ao registro fk */
    valores.oid = nti.criarOidHtml();

    /** armazena valores do form */
    nti.armazenarObjeto(eval(valores), id);

    /** Envia dados para serem renderizados no form principal */
    $.ajax({
      type: "POST",
      url: constantes.url + "/" + nome_fk + "Ficha",
      data: nti.arrayToString(valores),
      cache: false,
      success: function (dado) {
        nti.adicionarItemNaFichaBoxSemExcluir(nome_fk, id, valores.oid, dado);
      },
    });
  };

  this.adicionarItemNaFicha = function (
    pagina,
    id,
    oid,
    html,
    width,
    height,
    options,
    params,
    paramsDinamicos
  ) {
    var icone_apagar = "";
    var icone_editar = "";
    if (typeof options !== "undefined") {
      if (!options.semExcluir) {
        icone_apagar = nti.getFkIconeApagar(id, oid);
      }
      if (!options.semEditar) {
        icone_editar = nti.getFkIconeEditar(
          pagina,
          id,
          oid,
          width,
          height,
          options,
          params,
          paramsDinamicos
        );
      }
    }
    if (document.getElementById(oid)) {
      $("#" + oid).remove();
    }
    if (options.saidaTabela) {
      var betweenBody = html.split("<tbody>").pop().split("</tbody>").shift();
      var betweenBodyLinha = betweenBody.replace("<tr>", "<tr id=" + oid + ">");
      var linha = betweenBodyLinha.replace(
        "</tr>",
        "<td><ul id='ulFk'>" +
          icone_editar +
          "</ul></td><td><ul id='ulFk'>" +
          icone_apagar +
          "</ul></td></tr>"
      );
    } else {
      var ficha = "<td>" + html + "</td>";
      var linha =
        "<tr id=" +
        oid +
        ">" +
        ficha +
        '<td><ul id="ulFk">' +
        icone_editar +
        icone_apagar +
        "</ul></td></tr>";
    }
    return linha;
  };

  this.adicionarItemNaFichaBoxFixo = function (pagina, id, oid, html) {
    var ficha = "<td>" + html + "</td>";
    var dom = "#tb_" + id + " tbody";
    //var icone_apagar = nti.getFkIconeApagar(id,oid);
    var icone_editar = nti.getFkIconeEditarFkEndereco(pagina, id, oid);

    /** Apaga a ficha html se ela já existir */
    if (document.getElementById(oid)) {
      $("#" + oid).remove();
    }

    var linha =
      "<tr id=" +
      oid +
      ">" +
      ficha +
      '<td><ul id="ulFk">' +
      icone_editar +
      "</ul></td></tr>";
    $(dom).append(linha);
  };

  this.adicionarItemNaFichaBoxSemAlterar = function (pagina, id, oid, html) {
    var ficha = "<td>" + html + "</td>";
    var dom = "#tb_" + id + " tbody";
    var icone_apagar = nti.getFkIconeApagar(id, oid);
    var icone_editar = nti.getFkIconeEditar(pagina, id, oid);

    /** Apaga a ficha html se ela já existir */
    if (document.getElementById(oid)) {
      $("#" + oid).remove();
    }

    var linha =
      "<tr id=" +
      oid +
      ">" +
      ficha +
      '<td><ul id="ulFk">' +
      icone_apagar +
      "</ul></td></tr>";
    $(dom).append(linha);

    //var item = "<tr id='"+oid+"'><td>"+html+"</td></tr>";
    //$('#tb_'+id+' tbody').append(item);
    //alert(html);
  };
  this.adicionarItemNaFichaBoxSemExcluir = function (pagina, id, oid, html) {
    var ficha = "<td>" + html + "</td>";
    var dom = "#tb_" + id + " tbody";
    //var icone_apagar = nti.getFkIconeApagar(id,oid);
    var icone_editar = nti.getFkIconeEditarFkEndereco(pagina, id, oid);

    /** Apaga a ficha html se ela já existir */
    if (document.getElementById(oid)) {
      $("#" + oid).remove();
    }

    var linha =
      "<tr id=" +
      oid +
      ">" +
      ficha +
      '<td><ul id="ulFk">' +
      icone_editar +
      "</ul></td></tr>";
    $(dom).append(linha);
  };

  this.preencherAlterarFkBoxFixo = function (nome_fk, valores, id) {
    valores += "&database=true"; //indica que registro é oriundo do banco de dados
    valores = nti.stringToArray(valores);

    /** Adicionar oid ao registro fk */
    valores.oid = nti.criarOidHtml();

    /** armazena valores do form */
    nti.armazenarObjeto(eval(valores), id);

    /** Envia dados para serem renderizados no form principal */
    $.ajax({
      type: "POST",
      url: constantes.url + "/" + nome_fk + "Ficha",
      data: nti.arrayToString(valores),
      cache: false,
      success: function (dado) {
        nti.adicionarItemNaFichaBoxFixo(nome_fk, id, valores.oid, dado);
      },
    });
  };
  this.preencherAlterarFkBoxSemExcluir = function (nome_fk, valores, id) {
    valores += "&database=true"; //indica que registro é oriundo do banco de dados
    valores = nti.stringToArray(valores);

    /** Adicionar oid ao registro fk */
    valores.oid = nti.criarOidHtml();

    /** armazena valores do form */
    nti.armazenarObjeto(eval(valores), id);

    /** Envia dados para serem renderizados no form principal */
    $.ajax({
      type: "POST",
      url: constantes.url + "/" + nome_fk + "Ficha",
      data: nti.arrayToString(valores),
      cache: false,
      success: function (dado) {
        nti.adicionarItemNaFichaBoxSemExcluir(nome_fk, id, valores.oid, dado);
      },
    });
  };

  /**
   * @todo especializar classe fk
   *
   */
  this.getFkIconeEditar = function (
    pagina,
    id,
    oid,
    width,
    height,
    options,
    params,
    paramsDinamicos
  ) {
    if (typeof options !== "undefined") {
      options = JSON.stringify(options);
      options = options.replace(/"/g, "'");
    }
    if (params === undefined) {
      params = "";
    }
    if (paramsDinamicos === undefined) {
      paramsDinamicos = "";
    }
    var onclick =
      "nti.editarItemFk('" +
      pagina +
      "','" +
      id +
      "','" +
      oid +
      "','" +
      width +
      "','" +
      height +
      "', " +
      options +
      ", '" +
      params +
      "', '" +
      paramsDinamicos +
      "');";
    var titulo = "Editar";
    var icon_apagar =
      '<li title="' +
      titulo +
      '" onclick="' +
      onclick +
      '"><i class="material-icons agr-font-20px">create</i></li>';
    return icon_apagar;
  };

  /**
   * @todo especializar classe fk // Edilson: tirar isso daqui
   *
   */
  this.getFkIconeEditarFkEndereco = function (pagina, id, oid) {
    var onclick =
      "nti.editarItemFkEndereco('" + pagina + "','" + id + "'," + oid + ");";
    var titulo = "Editar";
    var icon_apagar =
      '<li title="' +
      titulo +
      '" onclick="' +
      onclick +
      '"><i class="material-icons agr-font-20px">create</i></li>';
    return icon_apagar;
  };

  /**
   * @todo especializar classe fk
   *
   */
  this.getFkIconeApagar = function (id, oid) {
    var onclick = "nti.apagarItemFk('" + id + "','" + oid + "');";
    var titulo = "Apagar";
    var icon_apagar =
      '<li title="' +
      titulo +
      '" onclick="' +
      onclick +
      '"><i class="material-icons agr-font-20px">delete_forever</i></li>';
    return icon_apagar;
  };

  /**
   * @todo especializar classe fk
   *
   */
  this.apagarItemFk = function (id, oid) {
    $("#msgApagar").remove();
    $("#divEdicao").prepend('<div id="msgApagar"></div>');
    $("#msgApagar").removeClass("ui-state-error ui-corner-all");
    $("#msgApagar").html("<strong>Deseja apagar essa informação?</strong>");

    $("#msgApagar").dialog({
      resizable: false,
      height: 140,
      modal: true,
      title: "Mensagem de Confirmação",
      buttons: {
        Confirmar: function () {
          /* Retirar o registro do hidden */
          nti.retirarValorArmazenado(id, oid);

          /** Apaga a ficha html que é visualizada para o usuário */
          if (document.getElementById(oid)) {
            $("#" + oid).remove();
          }
          $("#msgApagar").dialog("destroy");
        },
        Fechar: function () {
          $("#msgApagar").dialog("destroy");
        },
      },
    });
  };

  /**
   *
   */
  this.retirarOidInArray = function (ar_oid, valor_oid) {
    var ar = new Array();
    var ponto = nti.localizarIndiceOidInArray(ar_oid, valor_oid);
    if (ponto) {
      for (indice in ar_oid) {
        if (indice != ponto) {
          ar[indice] = ar_oid[indice];
        }
      }
    }
    return ar;
  };

  this.localizarIndiceOidInArray = function (ar_oid, valor_oid) {
    var ponto = false;
    for (linha in ar_oid) {
      registro = ar_oid[linha];
      for (indice in registro) {
        var posicao = registro[indice].indexOf("oid=");
        if (posicao >= 0) {
          var valor = registro[indice].substr(posicao + 4);
          if (valor_oid == valor) {
            ponto = linha;
          }
        }
      }
    }
    return ponto;
  };

  this.getOidInArray = function (registro) {
    var ponto = false;
    for (indice in registro) {
      var posicao = registro[indice].indexOf("oid=");
      if (posicao >= 0) {
        ponto = registro[indice].substr(posicao + 4);
      }
    }
    return ponto;
  };

  this.checkOidInArray = function (registro) {
    var ponto = false;
    for (indice in registro) {
      var posicao = registro[indice].indexOf("oid=");
      if (posicao >= 0) {
        ponto = registro[indice].substr(posicao + 4);
      }
    }
    return ponto;
  };

  /**
   * @todo especializar classe fk
   *
   */
  this.editarItemFk = function (
    pagina,
    id,
    oid,
    width,
    height,
    options,
    params,
    paramsDinamicos
  ) {
    this.disabled = true;
    var registro = new Array();
    var ar = nti.getValueByIdInArray(id);

    for (indice in ar) {
      var matriz = ar[indice];
      for (chave in matriz) {
        var item = matriz[chave];
        var vetor = item.split("=");
        if (vetor[0] == "oid") {
          if (vetor[1] == oid) {
            registro = ar[indice];
            break;
          }
        }
      }
    }
    nti.abrirFormModalBox(
      oid,
      pagina,
      "",
      id,
      width,
      height,
      registro,
      options,
      params,
      paramsDinamicos,
      true
    );
    this.disabled = false;
  };
  /**
   * @todo especializar classe fk
   *
   */
  this.editarItemFkEndereco = function (pagina, id, oid) {
    this.disabled = true;
    var registro = new Array();
    var ar = nti.getValueByIdInArray(id);

    for (indice in ar) {
      var matriz = ar[indice];
      for (chave in matriz) {
        var item = matriz[chave];
        var vetor = item.split("=");
        if (vetor[0] == "oid") {
          if (vetor[1] == oid) {
            registro = ar[indice];
            break;
          }
        }
      }
    }
    nti.abrirFormModalBoxFixo(pagina, "", id, null, registro);
    this.disabled = false;
  };
  /**
   * Recebe um objeto javascript e armazena seus valores no atributo value de um componente html
   * @todo Especializar essa função em uma nova classe
   **/
  this.retirarValorArmazenado = function (id, oid) {
    var str = "";
    var ar_anterior = nti.getValueByIdInArray(id);
    var indice = nti.localizarIndiceOidInArray(ar_anterior, oid);
    if (indice) {
      for (registro in ar_anterior) {
        if (indice != registro) {
          var temp = ar_anterior[registro];
          for (posicao in temp) {
            str += temp[posicao] + nti.delimitador_campo;
          }
          str += nti.delimitador;
        }
      }
      $("input[type='hidden']#" + id)
        .val(str)
        .trigger("change");
    }
  };
  /**
   * Recebe um objeto javascript e armazena seus valores no atributo value de um componente html
   * @todo Especializar essa função em uma nova classe
   **/
  this.armazenarObjeto = function (objeto, id) {
    var str = "";
    var ar_anterior = nti.getValueByIdInArray(id);

    var indice = nti.localizarIndiceOidInArray(ar_anterior, objeto.oid);

    if (indice) {
      // Se o oid já existir
      //Substituir o registro anterior
      for (registro in ar_anterior) {
        if (registro == indice) {
          // substitui o valor antigo
          for (posicao in objeto) {
            str += posicao + "=" + objeto[posicao] + nti.delimitador_campo;
          }
        } else {
          var temp = ar_anterior[registro];
          for (posicao in temp) {
            str += temp[posicao] + nti.delimitador_campo;
          }
        }
        str += nti.delimitador;
      }
      $("#" + id)
        .val(str)
        .change();
    } else {
      // adiciona um object ao hidden
      for (var propriedade in objeto) {
        str += propriedade + "=" + objeto[propriedade] + nti.delimitador_campo;
      }
      var valor = $("#" + id).val() + str + nti.delimitador;
      $("#" + id)
        .attr("value", valor)
        .change();
    }
  };

  /**
   * Sabendo do id de um componente, ele lê o atributo value e retorna um array de objetos.
   * @todo Especializar essa função em uma nova classe
   */
  this.getValueByIdInArray = function (id) {
    //var hidden = $('#'+id).val();
    var hidden = $("input[type='hidden']#" + id).val();

    /** Primeiro separa os vários registros */
    var vetor = hidden.split(nti.delimitador);

    /** Percorre os campos/valores */
    var ar = new Array();
    for (var i = 0; i < vetor.length; i++) {
      /* Cria um vetor com todos os campos do registro */
      var matriz = new Array();
      var ar_campo = vetor[i].split(nti.delimitador_campo);
      if ($.isArray(ar_campo) && ar_campo != "") {
        ar[i] = ar_campo;
      }
    }

    return ar;
  };

  this.array2dToJson = function (a, p, nl) {
    var i,
      j,
      s = '{"' + p + '":[';
    nl = nl || "";
    for (i = 0; i < a.length; ++i) {
      s += nl + nti.array1dToJson(a[i]);
      if (i < a.length - 1) {
        s += ",";
      }
    }
    s += nl + "]}";
    return s;
  };

  this.array1dToJson = function (a, p) {
    var i,
      s = "[";
    for (i = 0; i < a.length; ++i) {
      if (typeof a[i] == "string") {
        s += '"' + a[i] + '"';
      } else {
        // assume number type
        s += a[i];
      }
      if (i < a.length - 1) {
        s += ",";
      }
    }
    s += "]";
    if (p) {
      return '{"' + p + '":' + s + "}";
    }
    return s;
  };

  /** Funcao utilizada no fk, deve ser especializada */
  this.criarOidHtml = function () {
    return nti.aleatorio(1000000, 10000000);
  };

  /**
   * @todo especializar classe fk
   *
   */
  this.preencherAlterarFk = function (
    nome_fk,
    valores,
    id,
    width,
    height,
    options,
    params,
    paramsDinamicos
  ) {
    valores += "&database=true"; //indica que registro é oriundo do banco de dados
    valores = nti.stringToArray(valores);

    /** Adicionar oid ao registro fk */
    valores.oid = nti.criarOidHtml();

    /** armazena valores do form */
    nti.armazenarObjeto(eval(valores), id);

    /** Envia dados para serem renderizados no form principal */
    $.ajax({
      type: "POST",
      url: constantes.url + "/" + nome_fk + "Ficha",
      data: nti.arrayToString(valores),
      cache: false,
      success: function (dado) {
        var linha = nti.adicionarItemNaFicha(
          nome_fk,
          id,
          valores.oid,
          dado,
          width,
          height,
          options,
          params,
          paramsDinamicos
        );
        var dom = "#tb_" + id + " tbody";
        $(dom).append(linha);
      },
    });
  };

  this.existevalor = function (vetor, valor) {
    for (var i = 0; i < vetor.length; i++) {
      if (this[i] == valor) return true;
    }
    return false;
  };

  this.objetoToJson = function (objeto) {
    return JSON.stringify(objeto);
  };

  this.gerarBoleto = function (registro) {
    $('<div id="datapgto"></div>').load(
      constantes.url + "/check-vencimento/id/" + registro,
      function (resultado) {
        resultado = JSON.parse(resultado);
        if (resultado.status === "200") {
          $("#boxDelete").html("Confirma geração de boleto bancário?");
          $("#boxDelete").dialog({
            resizable: true,
            width: 280,
            height: 210,
            modal: true,
            title: "Informações para Emissão",
            buttons: {
              "Gerar Boleto": function () {
                $.ajax({
                  type: "GET",
                  url: constantes.url + "/boleto/registro/" + registro,
                  success: function (endereco) {
                    if (endereco?.error !== undefined) {
                      $("#boxDelete").html(
                        endereco?.error
                      );
                      $("#boxDelete").dialog({
                        title: "Aviso",
                        buttons: {
                          Ok: function () {
                            $(this).dialog("close");
                          },
                        },
                      });
                    } else {
                      if (endereco) {
                        window.open(`/financeiro/dare/imprimir/id/${endereco}`, "_blank");
                        $("#boxDelete").dialog("close");
                      }

                      $("#boxDelete").html(
                        "Ocorreu um erro ao Gerar o Boleto com a Sefaz"
                      );

                    }
                  },
                });
                $(this).dialog("close");
              },
              Fechar: function () {
                $(this).dialog("close");
              },
            },
          });
        } else {
          $("#boxDelete").html(resultado.message);
          $("#boxDelete").dialog({
            buttons: {
              Fechar: function () {
                $(this).dialog("close");
              },
            },
          });
        }
      }
    );
  };

  this.imprimirDare = function (idDareSefaz) {
    // window.open(
    //   "https://app.sefaz.go.gov.br/arr-www/view/exibeDARE.jsf?codigo=" +
    //     idDareSefaz,
    //   "_blank"
    // );
    window.open("/financeiro/dare/imprimir/id/"+idDareSefaz, "_blank");
  };

  this.imprimirFundepec = function (idDareSefaz) {
    window.open("/financeiro/fundepec/imprimir/id/"+idDareSefaz, "_blank");
  };

  this.mostrarDicasMenu = function () {
    $("#div_dicamenu").dialog({
      resizable: false,
      width: 500,
      position: [10, 100],
      left: 0,
      title: "Instrução Sobre o Menu",
      autoResize: true,
      buttons: {
        Fechar: function () {
          $(this).dialog("close");
        },
      },
    });
  };

  /**
     *    $( '#boxDelete' ).html('');
     $( '#boxDelete' ).load(url+"/registro/"+registro);

     $(function() {
     $( "#dialog:ui-dialog" ).dialog( "close" );

     $( "#boxDelete" ).dialog({
     resizable: true,
     width: 550,
     height: 400,
     modal: true,
     title: 'Boleto de ',
     buttons: {
     "Fechar": function() {
     $( this ).dialog( "close" );
     },
     "Gerar Boleto": function() {
     $( this ).dialog( "close" );
     }
     }
     });
     });
     */

  this.validarNumero = function (sText) {
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;

    for (var i = 0; i < sText.length && IsNumber == true; i++) {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1) {
        IsNumber = false;
      }
    }
    return IsNumber;
  };

  /**
   * Valida uma data passada
   * @param string dia
   * @param string mes
   * @param string ano
   * @return Bool TRUE em caso de data vÃ¡lida, do contrÃ¡rio FALSE
   */
  this.validarData = function (valor) {
    var arrayData = valor.split("/");
    //Os dias da data
    var dia = Number(arrayData[0]);
    //O mês da data
    var mes = Number(arrayData[1]);
    //O ano da data
    var ano = Number(arrayData[2]);

    var dateRegExp = /^(19|20)\d\d-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegExp.test(ano + "-" + mes + "-" + dia)) return false; // formato invÃƒÂ¡lido
    if (dia == 31 && (/^0?[469]$/.test(mes) || mes == 11)) {
      return false; // dia 31 de um mes de 30 dias
    } else if (dia >= 30 && mes == 2) {
      return false; // mais de 29 dias em fevereiro
    } else if (
      mes == 2 &&
      dia == 29 &&
      !(ano % 4 == 0 && (ano % 100 != 0 || ano % 400 == 0))
    ) {
      return false; // dia 29 de fevereiro de um ano nÃ£o bissexto
    } else {
      return true; // Data vÃ¡lida
    }
  };

  this.replaceAll = function (str, de, para) {
    var pos = str.indexOf(de);
    while (pos > -1) {
      str = str.replace(de, para);
      pos = str.indexOf(de);
    }

    return str;
  };

  this.serializar = function (str) {
    str = nti.replaceAll(str, "&", nti.caractere_e);
    str = nti.replaceAll(str, "=", nti.caractere_igual);
    return str;
  };
  /**
   * Valida uma hora passada
   * @param int h Hora
   * @param int m Minuto
   * @param int s Segundo
   * @return Bool TRUE em caso de horÃ¡rio vÃ¡lido, do contrÃ¡rio FALSE
   */
  this.validarHorario = function (horario) {
    var valid = false;

    // Define uma expressão regular para validar se a hora informada está
    // no formato nn:nn:nn, onde n é um número entre 0 e 9
    var regex = new RegExp("^([0-9]{2}):([0-9]{2}):([0-9]{2})$");
    var matches = regex.exec(horario);

    if (matches != null) {
      var hour = parseInt(matches[1], 10);
      var minute = parseInt(matches[2], 10);
      var second = parseInt(matches[3], 10);

      var date = new Date(0, 0, 0, hour, minute, second, 0);
      valid =
        date.getHours() == hour &&
        date.getMinutes() == minute &&
        date.getSeconds() == second;
    }

    return valid;
  };

  this.validarDateTime = function (date_time) {
    var valid = false;

    // Define uma expressão regular para validar se a data/hora informada está
    // no formato nn/nn/nnnn nn:nn:nn, onde n é um número entre 0 e 9
    var regex = new RegExp(
      "^([0-9]{2})/([0-9]{2})/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$"
    );
    var matches = regex.exec(date_time);

    if (matches != null) {
      var day = parseInt(matches[1], 10);
      var month = parseInt(matches[2], 10) - 1;
      var year = parseInt(matches[3], 10);
      var hour = parseInt(matches[4], 10);
      var minute = parseInt(matches[5], 10);
      var second = parseInt(matches[6], 10);

      var date = new Date(year, month, day, hour, minute, second, 0);
      valid =
        date.getFullYear() == year &&
        date.getMonth() == month &&
        date.getDate() == day &&
        date.getHours() == hour &&
        date.getMinutes() == minute &&
        date.getSeconds() == second;
    }

    return valid;
  };

  /**
   * Função que simula uma de igual nome no PHP. Responsável por percorrer um vetor e checar
   * se o valor pedido consta nele.
   */
  this.in_array = function (valor, vetor) {
    for (var i in vetor) {
      if (valor == vetor[i]) {
        return i;
      }
    }
    return false;
  };

  /**
   * Limpa a formatação css e avisos de erro inclusos numa ação.
   * @param string nome Nome do formulário pai
   * @returns void
   */
  this.limpar_formatacao = function (nome) {
    $("#" + nome + " .inputErro").removeClass("inputErro");
    $("#" + nome + " .fieldsetErro").removeClass("fieldsetErro");
    $("#erro-id").html("");
  };

  /**
   * Restaura os dados de um forma, de acordo com os valores inicialmente carregados.
   * Isto quer dizer que não são necessariamente limpados.
   *
   * @param string nome Nome formulário pai
   */
  this.restaurar_formulario = function (nome) {
    document.getElementById(nome).reset();
  };

  this.md5 = function (str) {
    // Calculate the md5 hash of a string
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/md5    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: md5('Kevin van Zonneveld');
    // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
    var xl;
    var rotateLeft = function (lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
    var addUnsigned = function (lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = lX & 0x80000000;
      lY8 = lY & 0x80000000;
      lX4 = lX & 0x40000000;
      lY4 = lY & 0x40000000;
      lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
      if (lX4 & lY4) {
        return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
        } else {
          return lResult ^ 0x40000000 ^ lX8 ^ lY8;
        }
      } else {
        return lResult ^ lX8 ^ lY8;
      }
    };
    var _F = function (x, y, z) {
      return (x & y) | (~x & z);
    };
    var _G = function (x, y, z) {
      return (x & z) | (y & ~z);
    };
    var _H = function (x, y, z) {
      return x ^ y ^ z;
    };
    var _I = function (x, y, z) {
      return y ^ (x | ~z);
    };

    var _FF = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var _GG = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var _HH = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var _II = function (a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    var convertToWordArray = function (str) {
      var lWordCount;
      var lMessageLength = str.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 =
        (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = new Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] =
          lWordArray[lWordCount] |
          (str.charCodeAt(lByteCount) << lBytePosition);
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    };

    var wordToHex = function (lValue) {
      var wordToHexValue = "",
        wordToHexValue_temp = "",
        lByte,
        lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        wordToHexValue_temp = "0" + lByte.toString(16);
        wordToHexValue =
          wordToHexValue +
          wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
      }
      return wordToHexValue;
    };

    var x = [],
      k,
      AA,
      BB,
      CC,
      DD,
      a,
      b,
      c,
      d,
      S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22,
      S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20,
      S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23,
      S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;

    str = nti.utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;

    xl = x.length;
    for (k = 0; k < xl; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = _FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = _FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = _FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = _FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = _FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = _FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = _FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = _FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = _FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = _FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = _FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = _FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = _FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = _FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = _FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = _FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
      a = _GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = _GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = _GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = _GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = _GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = _GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = _GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = _GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = _GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = _GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = _GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = _GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = _GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = _GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = _GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
      a = _HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = _HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = _HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = _HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = _HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = _HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = _HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = _HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = _HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = _HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = _HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = _HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = _HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = _HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = _HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = _HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
      a = _II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = _II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = _II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = _II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = _II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = _II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = _II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = _II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = _II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = _II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = _II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = _II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = _II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = _II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = _II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = _II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }
    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

    return temp.toLowerCase();
  };

  /**
   * Função para ler um formulário e retornar um array com os campos/valores
   * @todo Usar a função serialize do j
   */
  this.ler_formulario = function (nome) {
    var arCheckBox = new Array();
    var arDados = new Array();
    var formulario = $("#" + nome).get(0);
    for (var i = 0, node; (node = formulario[i++]); ) {
      switch (node.tagName.toLowerCase()) {
        case "input":
          switch (node.type.toLowerCase()) {
            case "text":
              arDados[node.id] = nti.serializar(node.value);
              break;
            case "password":
              if (node.value.length) {
                arDados[node.id] = nti.md5(node.value);
              } else {
                arDados[node.id] = "";
              }
              break;
            case "radio":
              if (node.checked) {
                arDados[node.name] = node.value;
              }
              break;
            case "checkbox":
              if (node.checked) {
                if (!arDados[node.name]) {
                  arDados[node.name] = new Array();
                  arCheckBox.push(node.name);
                }
                arDados[node.name].push(node.value);
              }
              break;
            case "hidden":
              arDados[node.id] = node.value.toString();
              break;
          }
          break;
        case "select":
          if (node.multiple) {
            for (var j = 0, option; (option = node.options[j]); j++) {
              if (option.selected) {
                arDados[node.id]
                  ? arDados[node.id].push(option.value)
                  : (arDados[node.id] = new Array(option.value));
              }
            }
          } else {
            arDados[node.id] = node.value;
          }
          if (typeof arDados[node.id] === "undefined") {
            arDados[node.id] = "";
          }
          break;
        case "textarea":
          arDados[node.id] = node.value;
          break;
      }
    }
    for (var j = 0; j < arCheckBox.length; ++j) {
      arDados[arCheckBox[j]] = arDados[arCheckBox[j]].join(",");
    }

    $(".fk-agrupar").each(function () {
      arDados[$(this).attr("id")] = nti.ler_agrupar();
    });

    return arDados;
  };

  this.ler_agrupar = function () {
    var tabela = [];
    var pai = $(this).attr("id");
    $("ul.fk-agrupar li").addClass("fk-agrupar-li");
    $(".fk-agrupar-li").each(function () {
      var item = "";
      $(this)
        .find("input")
        .each(function () {
          item =
            item +
            $(this).attr("id") +
            "=" +
            $(this).val() +
            nti.delimitador_campo;
        });
      tabela.push(item);
    });
    return tabela.join(nti.delimitador);
  };

  /**
   * Lê o valor de um grupo de radiobox
   * @param form string Nome do formulário
   * @param radio string Nome do radio
   **/
  this.ler_radio = function (form, radio) {
    var tamanho = document.forms[form][radio];
    if (tamanho.length) {
      for (var j = 0; j < tamanho.length; ++j) {
        if (document.forms[form][radio][j].checked) {
          return document.forms[form][radio][j].value;
        }
      }
    } else {
      return tamanho.value;
    }
    return "";
  };

  this.get_default = function (valor, def) {
    return typeof valor == "undefined" ? def : valor;
  };

  /**
   * Verifica qual a tecla que o usuário pressionou
   */
  this.testa_tecla = function (evento) {
    /**
     * Atendendo ao ie
     */
    if (!evento) {
      evento = window.event;
    }

    /**
     * Atendendo ao FF
     */
    if (
      typeof evento.charCode != "undefined" &&
      evento.charCode != evento.keyCode
    ) {
      if (evento.charCode) {
        return evento.charCode;
      } else {
        var code;
        switch (evento.keyCode) {
          case 8:
            code = "DELETE";
            break;
          case 9:
            code = "TAB";
            break;
          case 13:
            code = 13;
            break; //'ENTER'; Os outros navegadores retornam 13 tmb
          case 37:
            code = "LEFT";
            break;
          case 39:
            code = "RIGHT";
            break;
          case 46:
            code = "BACKSPACE";
            break;
          case 116:
            code = "F5";
            break;
        }
        return code;
      }
    }
    return evento.keyCode;
  };

  this.utf8_encode = function (string) {
    // Encodes an ISO-8859-1 string to UTF-8
    //
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/utf8_encode   // + original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: sowberry
    // +    tweaked by: Jack
    // + bugfixed by: Onno Marsman  // + improved by: Yves Sucaet
    // + bugfixed by: Onno Marsman
    // + bugfixed by: Ulrich
    // *    example 1: utf8_encode('Kevin van Zonneveld');
    // *    returns 1: 'Kevin van Zonneveld'    var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
      var c1 = string.charCodeAt(n);
      var enc = null;

      if (c1 < 128) {
        end++;
      } else if (c1 > 127 && c1 < 2048) {
        enc =
          String.fromCharCode((c1 >> 6) | 192) +
          String.fromCharCode((c1 & 63) | 128);
      } else {
        enc =
          String.fromCharCode((c1 >> 12) | 224) +
          String.fromCharCode(((c1 >> 6) & 63) | 128) +
          String.fromCharCode((c1 & 63) | 128);
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.substring(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
    }

    if (end > start) {
      utftext += string.substring(start, string.length);
    }

    return utftext;
  };

  this.htmlEncode = function (value) {
    if (value) {
      return jQuery("<div />").text(value).html();
    } else {
      return "";
    }
  };

  this.htmlDecode = function (value) {
    if (value) {
      return $("<div />").html(value).text();
    } else {
      return "";
    }
  };

  /**
   * Verifica se a tecla clicada é um número
   * @param event Evento do onKeyPress
   * @return bool Se é permitido o caractere
   */
  this.mascara_numero = function (event) {
    var nTecla = nti.testa_tecla(event);

    if (!nti.check_integer(nTecla)) {
      return true;
    }

    if (nTecla < 48 || nTecla > 57) {
      return false;
    }

    return true;
  };

  /**
   * Aplica uma máscara ao value do elemento
   * @param evento Evento do onKeyPress
   * @param elemento Elemento do onKeyPress
   * @param mascara Máscara a ser aplicada
   * @return bool Se é permitido o caractere
   */
  this.mascara = function (evento, elemento, mascara) {
    var nTecla = nti.testa_tecla(evento);

    /**
     * Se a nTecla não for um inteiro retorna (ver testa_tecla)
     */
    if (!nti.check_integer(nTecla)) return true;

    var sValue = elemento.value;

    if (sValue.length >= nti.mascara.length) return false;

    // Limpa todos os caracteres de formatação que já estiverem no campo.
    var j = 0;
    while (j <= sValue.length) {
      sValue = sValue.replace("-", "");
      sValue = sValue.replace(".", "");
      sValue = sValue.replace(":", "");
      sValue = sValue.replace("/", "");
      sValue = sValue.replace("(", "");
      sValue = sValue.replace(")", "");
      sValue = sValue.replace(",", "");
      sValue = sValue.replace(" ", "");
      ++j;
    }
    var fldLen = sValue.length;

    var i = 0,
      nCount = 0,
      sCod = "",
      mskLen = fldLen;

    while (i <= mskLen) {
      var bolMask =
        mascara.charAt(i) == "-" ||
        mascara.charAt(i) == "." ||
        mascara.charAt(i) == "/" ||
        mascara.charAt(i) == "(" ||
        mascara.charAt(i) == ")" ||
        mascara.charAt(i) == " " ||
        mascara.charAt(i) == ":" ||
        mascara.charAt(i) == ",";

      if (bolMask) {
        sCod += mascara.charAt(i);
        ++mskLen;
      } else {
        sCod += sValue.charAt(nCount);
        ++nCount;
      }
      ++i;
    }
    elemento.value = sCod;

    if (mascara.charAt(i - 1) == "9") {
      // apenas números...
      return nTecla > 47 && nTecla < 58;
    } // números de 0 a 9
    else {
      // qualquer caracter...
      return true;
    }
  };

  this.mascara_moeda = function (evento, campo) {
    var nTecla = nti.testa_tecla(evento);

    /**
     * Se a nTecla não for um inteiro retorna (ver testa_tecla)
     */
    if (!nti.check_integer(nTecla)) {
      return true;
    }
    if (nTecla < 48 || nTecla > 57) {
      //só numeros
      return false;
    }

    var sValue = "";
    if (campo.selectionEnd - campo.selectionStart != campo.value.length) {
      sValue = campo.value;
    }

    sValue += String.fromCharCode(nTecla);

    campo.value = nti.aplica_mascara_moeda(sValue);
    return false;
  };

  this.aplica_mascara_moeda = function (sValue) {
    // Limpa todos os caracteres de formatação que já estiverem no campo.
    sValue = sValue.replace(/\,/g, ""); //yes, expressão regular manda demais
    sValue = sValue.replace(/\./g, "");

    var output = "";
    var i = 0,
      tam = sValue.length;
    while (i < tam) {
      if (i == 2) output = "," + output;
      else if ((i - 2) % 3 == 0) output = "." + output;

      output = sValue.charAt(tam - i - 1) + output;
      ++i;
    }
    return output;
  };

  this.aplicaMascara = function (sValue, mascara) {
    if (sValue.length == 0) return "";
    if (sValue.length == mascara.length) return sValue;
    else if (sValue.length > mascara.length)
      return sValue.substring(0, mascara.length);
    else {
      for (var i = sValue.length; i < mascara.length; ++i) {
        if (mascara.charAt(i) == "9") sValue += "0";
        else sValue += mascara.charAt(i);
      }
    }
    return sValue;
  };

  this.alterar_visibilidade = function (elemento, visivel) {
    visivel
      ? $("#" + elemento).removeClass("visibilityHidden")
      : $("#" + elemento).addClass("visibilityHidden");
  };

  this.ler_elemento_evento = function (evento) {
    var elemento;
    /**
     * Código do www.w3schools.com
     */
    if (!evento) {
      evento = window.event;
    }
    if (evento.target) {
      elemento = evento.target;
    } else if (evento.srcElement) {
      elemento = evento.srcElement;
    }
    if (elemento.nodeType == 3) {
      // defeat Safari bug
      elemento = elemento.parentNode;
    }
    /**
     * Fim
     */
    return elemento;
  };

  this.arrayToString = function (ar_valores) {
    var string = "";
    for (var i in ar_valores) {
      string += i + "=" + ar_valores[i] + "&";
    }
    return string;
  };

  this.stringToArray = function (string) {
    var ar = new Array();
    var conector = "&";
    var vetor = string.split(conector);
    for (i = 0; i < vetor.length; ++i) {
      var tmp = vetor[i].split("=");
      ar[tmp[0]] = tmp[1];
    }
    return ar;
  };

  /**
   * Verifica se o código é um inteiro
   */
  this.check_integer = function (codigo) {
    return !isNaN(parseInt(codigo));
  };
  /**
   * Verifica se o código é um float
   */
  this.check_float = function (codigo) {
    return !isNaN(parseFloat(codigo));
  };

  /**
   * Verifica se variável é array
   **/
  this.isArray = function (array) {
    return typeof array.length == "undefined" ? false : true;
  };

  this.isNumberKey = function (evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  };

  this.isNumberKeyWithBar = function (evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 47) {
      return false;
    }

    return true;
  };

  this.isNumberKeyWithDot = function (evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }

    return true;
  };

  this.isNumberKeyWithDashDot = function (evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (
      charCode > 31 &&
      (charCode < 48 || charCode > 57) &&
      charCode != 46 &&
      charCode != 45
    ) {
      return false;
    }

    return true;
  };

  this.isNumberKeyWithComma = function (evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44) {
      return false;
    }

    return true;
  };

  this.teclaEnterLogin = function (e) {
    // look for window.event in case event isn't passed in
    if (window.event) {
      e = window.event;
    }
    if (e.keyCode == 13) {
      document.getElementById("login").click();
    }
  };

  this.number_format = function (number) {
    // %        nota 1: Para 1000.55 retorna com precisão 1 no FF/Opera é 1,000.5, mas no IE é 1,000.6
    // *     exemplo 1: number_format(1234.56);
    // *     retorno 1: '1,235'
    // *     exemplo 2: number_format(1234.56, 2, ',', ' ');
    // *     retorno 2: '1 234,56'
    // *     exemplo 3: number_format(1234.5678, 2, '.', '');
    // *     retorno 3: '1234.57'
    // *     exemplo 4: number_format(67, 2, ',', '.');
    // *     retorno 4: '67,00'
    // *     exemplo 5: number_format(1000);
    // *     retorno 5: '1,000'
    // *     exemplo 6: number_format(67.311, 2);
    // *     retorno 6: '67.31'

    var decimals = 2;
    var dec_point = ",";
    var thousands_sep = ".";

    var n = number,
      prec = decimals;
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = typeof thousands_sep == "undefined" ? "," : thousands_sep;
    var dec = typeof dec_point == "undefined" ? "." : dec_point;

    var s = prec > 0 ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = Math.abs(n).toFixed(prec);
    var _, i;

    if (abs >= 1000) {
      _ = abs.split(/\D/);
      i = _[0].length % 3 || 3;

      _[0] =
        s.slice(0, i + (n < 0)) + _[0].slice(i).replace(/(\d{3})/g, sep + "$1");

      s = _.join(dec);
    } else {
      s = s.replace(".", dec);
    }

    return s;
  };

  this.aleatorio = function (inferior, superior) {
    var numPossibilidades = superior - inferior;
    var aleatorio = Math.random() * numPossibilidades;
    aleatorio = Math.floor(aleatorio);
    return parseInt(inferior) + aleatorio;
  };

  this.isLetterKey = function (evt) {
    var inputValue = event.which;
    if (inputValue > 47 && inputValue < 58 && inputValue != 32) {
      return false;
    } else {
      return true;
    }
  };

  this.var_dump = function (obj) {
    if (typeof obj == "object") {
      return (
        "Type: " +
        typeof obj +
        (obj.constructor ? "\nConstructor: " + obj.constructor : "") +
        "\nValue: " +
        obj
      );
    } else {
      return "Type: " + typeof obj + "\nValue: " + obj;
    }
    this.isLetterKey = function (evt) {
      var inputValue = event.which;
      if (inputValue > 47 && inputValue < 58 && inputValue != 32) {
        return false;
      } else {
        return true;
      }
    };
  }; //end function var_dump
  /***********************************************************************************************
   *
   * Eventos dos componentes
   *
   ***********************************************************************************************/
  this.evento = function (nome, evento, id) {
    var funcao = nome + evento;
    if (typeof this[funcao] != "undefined") {
      this[funcao](id);
    } else {
      /* por enquanto nada a fazer */
    }
  };

  this.treeOnClick = function (nome, valor) {
    nti.evento(nome, "onClick", valor);
  };

  this.rawurlencode = function (str) {
    return encodeURIComponent(str)
      .replace(/!/g, "%21")
      .replace(/'/g, "%27")
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      .replace(/\*/g, "%2A");
  };

  this.encurtarMenu = function () {
    var maxHeight = 400;

    $(".dropdown > li").hover(
      function () {
        var $container = $(this),
          $list = $container.find(".menuItemModulo"),
          $anchor = $container.find("a"),
          height = $list.height() * 1.1, // make sure there is enough room at the bottom
          multiplier = height / maxHeight; // needs to move faster if list is taller

        alert($this.html());
        // need to save height here so it can revert on mouseout
        $container.data("origHeight", $container.height());

        // so it can retain it's rollover color all the while the dropdown is open
        $anchor.addClass("hover");

        // make sure dropdown appears directly below parent list item
        $list.show().css({
          paddingTop: $container.data("origHeight"),
        });

        // don't do any animation if list shorter than max
        if (multiplier > 1) {
          $container
            .css({
              height: maxHeight,
              overflow: "hidden",
            })
            .mousemove(function (e) {
              var offset = $container.offset();
              var relativeY =
                (e.pageY - offset.top) * multiplier -
                $container.data("origHeight") * multiplier;
              if (relativeY > $container.data("origHeight")) {
                $list.css("top", -relativeY + $container.data("origHeight"));
              }
            });
        }
      },
      function () {
        var $el = $(this);

        // put things back to normal
        $el
          .height($(this).data("origHeight"))
          .find("ul")
          .css({
            top: 0,
          })
          .hide()
          .end()
          .find("a")
          .removeClass("hover");
      }
    );

    // Add down arrow only to menu items with submenus
    $(".dropdown > li:has('ul')").each(function () {
      $(this).find("a:first").append("<img src='images/down-arrow.png' />");
    });
  };

  this.exportarXLS = function () {
    var target = window.location.href + "&exportar=xls";
    var link = document.createElement("a");
    link.href = target;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  };

  this.salvarArquivo = function (file) {
    var arquivo = $("#file_exportar").get(0).files[0];
    alert($("#file_exportar").attr("value"));
  };

  this.getValorSessao = function () {
    var div = document.getElementById("div-session");
    return nti.md5(div.getAttribute("data-session"));
  };

  this.unsetValorSessao = function () {
    var div = document.getElementById("div-session");
    div.removeAttribute("data-session");
  };

  this.salvarConfiguracao = function (url, botao) {
    /** @todo criar função para limpeza de tela */
    $("#erroSalvar").remove();
    $("#divEdicao").prepend('<div id="erroSalvar"></div>');
    $("#erroGenerico").removeClass("ui-state-error ui-corner-all");
    $("#erroGenerico").html("");
    nti.limpar_formatacao("formEdicao");
    //nti.desabilitarBotao(botao,'Aguarde...');
    //document.getElementById('conteudo').cursor = 'wait';

    var xmlRequest = $.ajax({
      type: "POST",
      url: constantes.url + "/index/updateconfigurar",
      data: nti.arrayToString(nti.ler_formulario("formEdicao")),
      cache: false,
      success: function (resultado) {
        try {
          var retorno = JSON.parse(resultado);
        } catch (error) {
          alert(
            "Ocorreu um erro no servidor.\nJá estamos trabalhando para corrigi-lo!"
          );
          console.log(resultado);
          return false;
        }

        if (nti.isArray(retorno)) {
          if (retorno[0] === "erro") {
            var generico = "";
            $("span[id^=erro]").html("");
            $("#mensagemErro").remove();
            for (var i in retorno[1]) {
              if (i.length > 1) {
                generico = generico.concat(
                  '<h3 style="margin-top: 10px;">' + retorno[1][i] + "</h3>"
                );
              }
            }
            //                        nti.habilitarBotao(botao,'Salvar');
          } else if (retorno[0] == "ok") {
            Swal.fire({
              text: "Registro alterado com sucesso!",
              type: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK!",
            }).then((result) => {
              if (result.value) {
                this.disabled = false;
                var valor = retorno;
                var proxima_tela = valor[1].redirecionar;
                var chave = valor[1].id;
                var parametros = "";
                if (
                  typeof chave == "undefined" &&
                  typeof proxima_tela != "undefined"
                ) {
                  window.location = constantes.url + "/" + proxima_tela;
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros.length == 0
                ) {
                  window.location =
                    constantes.url + "/" + proxima_tela + "/id/" + chave;
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros != "undefined"
                ) {
                  var i = 1;
                  $.each(valor[1].parametros, function (k, v) {
                    parametros += "/param" + i + "/" + v;
                  });
                  window.location =
                    constantes.url +
                    "/" +
                    proxima_tela +
                    "/id/" +
                    chave +
                    parametros;
                } else {
                  /** Se não tiver nenhuma resposta sobre redirecionamento, envia pra lista*/
                  window.location = constantes.url;
                }
                $(this).dialog("close");
              }
            });
          } else {
            $("#erroSalvar").addClass("ui-state-error ui-corner-all");
            $("#erroSalvar").html(resultado);
            //                        nti.habilitarBotao(botao,'Salvar');
          }
        }
        document.getElementById("conteudo").cursor = "default";
      },
      error: function () {
        document.getElementById("conteudo").cursor = "default";
      },
      notmodified: function () {},
      timeout: function () {},
      abort: function () {},
    });

    xmlRequest.fail(function (textStatus) {
      $("#erroSalvar").addClass("ui-state-error ui-corner-all");
      $("#erroSalvar").html(textStatus);
    });
  };

  this.salvarStorage = function (informacao) {
    window.localStorage.setItem("sessao", informacao);
  };

  this.recuperarStorage = function () {
    window.localStorage.getItem("sessao");
  };

  this.limparStorage = function () {
    window.localStorage.clear();
  };

  this.alterarParametro = function (urlParametro) {
    $("#erroPainel").remove();
    $("#arParamGrafico").val();
    $("#divPainel").prepend('<div id="erroPainel"></div>');
    //$('#erroGenerico').removeClass('ui-state-error ui-corner-all');
    //$('#erroGenerico').html("");

    //nti.limpar_formatacao('formPainel');

    var xmlRequest = $.ajax({
      type: "POST",
      url: urlParametro,
      //data: nti.arrayToString(nti.ler_formulario('formEdicao')),
      cache: false,
      success: function (resultado) {
        $("#divPainel").html('<form id="formPainel">' + resultado + "</form>");
        $("#divPainel").dialog({
          height: 250,
          width: 400,
          modal: true,
          title: "Parâmetro do Painel",
          buttons: {
            Ok: function () {
              window.location.href =
                window.location.href +
                nti.arrayToString(nti.ler_formulario("formPainel"));
              $(this).dialog("close");
              /* window.location = url + '/listar'; */
            },
          },
        });
      },
      error: function () {
        document.getElementById("conteudo").cursor = "default";
      },
      notmodified: function () {},
      timeout: function () {},
      abort: function () {},
    });

    xmlRequest.fail(function (textStatus) {
      $("#erroSalvar").addClass("ui-state-error ui-corner-all");
      $("#erroSalvar").html(textStatus);
    });
  };

  this.salvarParametro = function (url, botao) {
    /** @todo criar função para limpeza de tela */
    $("#erroSalvar").remove();
    $("#divEdicao").prepend('<div id="erroSalvar"></div>');
    $("#erroGenerico").removeClass("ui-state-error ui-corner-all");
    $("#erroGenerico").html("");
    nti.limpar_formatacao("formEdicao");
    document.getElementById("conteudo").cursor = "wait";

    var xmlRequest = $.ajax({
      type: "POST",
      url: constantes.url + "/index/updateparametros",
      data: nti.arrayToString(nti.ler_formulario("formEdicao")),
      cache: false,
      success: function (resultado) {
        try {
          var retorno = JSON.parse(resultado);
        } catch (error) {
          alert(
            "Ocorreu um erro no servidor.\nJá estamos trabalhando para corrigi-lo!"
          );
          console.log(resultado);
          return false;
        }

        if (nti.isArray(retorno)) {
          if (retorno[0] === "erro") {
            var generico = "";
            $("span[id^=erro]").html("");
            $("#mensagemErro").remove();
            for (var i in retorno[1]) {
              if (i.length > 1) {
                generico = generico.concat(
                  '<h3 style="margin-top: 10px;">' + retorno[1][i] + "</h3>"
                );
              }
            }
            //                        nti.habilitarBotao(botao,'Salvar');
          } else if (retorno[0] == "ok") {
            Swal.fire({
              text: "Registro alterado com sucesso!",
              type: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK!",
            }).then((result) => {
              if (result.value) {
                this.disabled = false;
                var valor = retorno;
                var proxima_tela = valor[1].redirecionar;
                var chave = valor[1].id;
                var parametros = "";
                if (
                  typeof chave == "undefined" &&
                  typeof proxima_tela != "undefined"
                ) {
                  window.location = constantes.url + "/" + proxima_tela;
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros.length == 0
                ) {
                  window.location =
                    constantes.url + "/" + proxima_tela + "/id/" + chave;
                } else if (
                  typeof chave != "undefined" &&
                  typeof proxima_tela != "undefined" &&
                  valor[1].parametros != "undefined"
                ) {
                  var i = 1;
                  $.each(valor[1].parametros, function (k, v) {
                    parametros += "/param" + i + "/" + v;
                  });
                  window.location =
                    constantes.url +
                    "/" +
                    proxima_tela +
                    "/id/" +
                    chave +
                    parametros;
                } else {
                  /** Se não tiver nenhuma resposta sobre redirecionamento, envia pra lista*/
                  window.location = constantes.url;
                }
                $(this).dialog("close");
              }
            });
          } else {
            $("#erroSalvar").addClass("ui-state-error ui-corner-all");
            $("#erroSalvar").html(resultado);
          }
        }
        document.getElementById("conteudo").cursor = "default";
      },
      error: function () {
        document.getElementById("conteudo").cursor = "default";
      },
      notmodified: function () {},
      timeout: function () {},
      abort: function () {},
    });

    xmlRequest.fail(function (textStatus) {
      $("#erroSalvar").addClass("ui-state-error ui-corner-all");
      $("#erroSalvar").html(textStatus);
    });
  };

  this.salvarnotificacaosimples = function (id_notificacao) {
    $.ajax({
      type: "POST",
      url: "/application/index/salvarnotificacaosimples",
      data: {
        id_notificacao: id_notificacao,
      },
      cache: false,
      success: function (data) {
        $("#notificacao" + id_notificacao).remove();
        $(".mdl-badge").attr("data-badge", parseInt(data.total));
      },
    });
  };

  this.salvarmensagemerro = function (ds_mensagemerro) {
    url = window.location.href;
    $.ajax({
      type: "POST",
      url: "/application/index/salvarmensagemerro",
      data: {
        ds_mensagemerro: ds_mensagemerro,
        url: url,
      },
      cache: false,
      success: function (data) {},
    });
  };

  this.formatTimestamp = function (
    timestamp,
    option = { hour: "2-digit", minute: "2-digit", hour12: false }
  ) {
    return new Date(timestamp).toLocaleTimeString("pr-BR", option);
  };

  this.getColorByStatus = function (status) {
    if (status === "online") {
      return "#2de0a5";
    }
    if (status === "away") {
      return "#ffd21f";
    }
    if (status === "busy") {
      return "#f5455c";
    }
    if (status === "offline") {
      return "#cbced1";
    }
  };

  this.generateHash = function (targetLength) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < targetLength; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  this.reenviarWsMapa = function (idMapaControle) {
    $.ajax({
      type: "POST",
      url: "/application/index/reenviarWs",
      data: { id_mapa_controle: idMapaControle },
      success: function (data) {
        alert(data.mensagem);
        $(":ui-dialog").dialog("close");
      },
    });
  };

  this.validarCNPJ = function (cnpj) {
    var cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "" || cnpj.length !== 14) {
      return false;
    }
    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    ) {
      return false;
    }
    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) {
      return false;
    }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) {
      return false;
    }
    return true;
  };

  this.checarRascunhoGta = function (
    id_entidade,
    tp_origem_destino,
    tp_grupo_especie,
    id_grupo_especie,
    id_pessoa
  ) {
    $("#conteudo").append('<div id="boxRascunhoGta"></div>');
    $.ajax({
      type: "POST",
      url: "/defesa-sanitaria-animal/gta/checar-rascunho-gta",
      data: {
        id_entidade: id_entidade,
        id_pessoa: id_pessoa,
        tp_origem_destino: tp_origem_destino,
        tp_grupo_especie: tp_grupo_especie,
        id_grupo_especie: id_grupo_especie,
      },
      cache: false,
      success: function (data) {
        if (data.status === 500) {
          var id_gta_rascunho = data.id_gta_rascunho;
          $('<div id="rascunhoGta"></div>').load(
            "/defesa-sanitaria-animal/gta/listar-rascunho-gta/id/" +
              id_gta_rascunho,
            function (pagina) {
              $("#boxRascunhoGta").html(pagina);
              $("#boxRascunhoGta").dialog({
                resizable: true,
                height: "auto",
                width: 800,
                modal: true,
                buttons: [
                  {
                    text: "Checar Pagamento",
                    click: function () {
                      if (
                        confirm(
                          "Caso o pagamento se confirme, será gerada uma GTA. Deseja continuar?"
                        )
                      ) {
                        $.ajax({
                          type: "POST",
                          url: "/defesa-sanitaria-animal/gta/pagamento",
                          data: {
                            id_gta_rascunho: id_gta_rascunho,
                            bo_ajax: true,
                          },
                          success: function (data) {
                            if (data.bo_liberado) {
                              alert(data.message);
                              window.open(
                                "/defesa-sanitaria-animal/gta/imprimir/id/" +
                                  id_gta_rascunho,
                                "_blank"
                              );
                              location.reload();
                              $("#boxRascunhoGta").dialog("close");
                            } else {
                              alert(data.message);
                            }
                          },
                          error: function (data) {
                            $(
                              "<b style='color:red;'>" +
                                $(data.responseText).find("#exception").html() +
                                "</b>"
                            ).appendTo($("#boxRascunhoGta"));
                          },
                        });
                      } else {
                        return false;
                      }
                    },
                  },
                  {
                    text: "Cancelar Rascunho",
                    click: function () {
                      if (
                        confirm(
                          "Tem certeza que deseja cancelar esse rascunho?"
                        )
                      ) {
                        $.ajax({
                          type: "POST",
                          url:
                            "/defesa-sanitaria-animal/gta/cancelar-rascunho-gta",
                          data: {
                            id_gta_rascunho: id_gta_rascunho,
                          },
                          success: function (data) {
                            alert(data.message);
                            location.reload();
                            $("#boxRascunhoGta").dialog("close");
                          },
                          error: function (data) {
                            $(
                              "<b style='color:red;'>" +
                                $(data.responseText).find("#exception").html() +
                                "</b>"
                            ).appendTo($("#boxRascunhoGta"));
                          },
                        });
                      } else {
                        return false;
                      }
                    },
                  },
                  {
                    text: "Visualizar Rascunho",
                    click: function () {
                      window.location =
                        "/defesa-sanitaria-animal/gta?id_gta_rascunho=" +
                        id_gta_rascunho;
                      $("#boxRascunhoGta").dialog("close");
                    },
                  },
                  {
                    text: "Fechar/Início",
                    click: function () {
                      window.location = "/";
                    },
                  },
                ],
              });
              $(".ui-dialog-titlebar-close").hide();
            }
          );
        }
      },
    });
  };
  /**************************************************************************************************/
  /**  Aqui temos o final da classe nti
     **
     /**************************************************************************************************/
}

///**
//     * Pública, Função chamada quando há um erro de sistema no protocolo
//     */
//this.errSisProtocolo = function(tipo, resultado){
//    switch(tipo){
//        case sispf.sistema_erro:
//            sispf.mensagem(sispf.sistema_erro, resultado);
//            break;
//        default:
//            alert(resultado);
//            break;
//    }
//
//}
//
//function onError(msg, url, linha){
//    alert('LINHA:' + linha + '\n URL:' + url + '\n MSG:' + msg);
//    return true;
//}
//
//function alterar(pagina) {
//    window.location = pagina;
//}
//
//function incluir(pagina) {
//    window.location = pagina+'/inserir';
//}
//
//function imprimirRegistro(pagina) {
//    window.location = pagina;
//}
//
//function update(pagina) {
//    window.location = pagina;
//    mensagemSucesso('Conteúdo alterado com sucesso');
//}
//
//function apagar(registro,rotina) {
//    $("#boxDelete").html( 'Deseja remover esse conteúdo?' );
//    $(function() {
//        $( "#dialog:ui-dialog" ).dialog( "close" );
//
//        $( "#boxDelete" ).dialog({
//            resizable: false,
//            height:140,
//            modal: true,
//            title: 'Tela de confirmação',
//            buttons: {
//                "Apagar": function() {
//                    $( '#boxDelete' ).load("apagar/id/"+registro,{
//                        id:registro
//                    });
//                    $( this ).dialog( "close" );
//                    window.location.href=window.location.href
//
//
//                },
//                "Cancelar": function() {
//                    $( this ).dialog( "close" );
//                }
//            }
//        });
//    });
//}
//
//
//
//
//function preencherSelect (select, valores){
//
//    var elm = $('#'+select).get(0);
//
//    elm.options.length = 0;
//    for(var i = 0; i < valores.length-1; i += 2){
//        elm.options[elm.length] = new Option(valores[i+1], valores[i]);
//    }
//    elm.value = valores[valores.length-1];
//}

this.abrirModalPesquisaEntidade = function (
  campo_retorno,
  campos_formulario
) {};

function daterangepainel() {
  date_range = $("#datefilter").val();
  date_first = date_range.substr(0, 10).split("/").reverse().join("-");
  date_last = date_range.substr(-10).split("/").reverse().join("-");
  params_painel =
    "_g=(refreshInterval:(pause:!t,value:0),time:(from:'" +
    date_first +
    "',to:'" +
    date_last +
    "'))";
  window.location.replace(
    constantes.url + "/painel?params_painel=" + params_painel
  );
}

$(function () {
  $("#datefilter").daterangepicker({
    autoUpdateInput: false,
    ranges: {
      Hoje: [moment(), moment()],
      Ontem: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Últimos 7 Dias": [moment().subtract(6, "days"), moment()],
      "Últimos 30 Dias": [moment().subtract(29, "days"), moment()],
      "Esse Mês": [moment().startOf("month"), moment().endOf("month")],
      "Mês Anterior": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
  });
  $("#datefilter").on("apply.daterangepicker", function (ev, picker) {
    $(this).val(
      picker.startDate.format("DD/MM/YYYY") +
        " - " +
        picker.endDate.format("DD/MM/YYYY")
    );
  });
  $("#datefilter").on("cancel.daterangepicker", function (ev, picker) {
    $(this).val("");
  });
});
