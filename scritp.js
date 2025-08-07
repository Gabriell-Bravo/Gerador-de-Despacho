let currentStep = 1;
        const totalSteps = 4;
        const formData = {
            apostilamentos: [],
            aditivos: []
        };

        function navigate(direction) {
            const nextStep = currentStep + direction;
            if (nextStep > 0 && nextStep <= totalSteps) {
                // Save data before leaving step
                saveStepData(currentStep);

                document.getElementById(`step-${currentStep}`).classList.add('step-inactive');
                document.getElementById(`step-${nextStep}`).classList.remove('step-inactive');

                const currentIndicator = document.getElementById(`step-indicator-${currentStep}`);
                currentIndicator.classList.remove('stepper-active');
                currentIndicator.classList.add('stepper-complete');

                document.getElementById(`step-indicator-${nextStep}`).classList.add('stepper-active');

                currentStep = nextStep;
                updateNavButtons();

                if (currentStep === 2) {
                    renderTimeline();
                }
                if (currentStep === totalSteps) {
                    generatePreview();
                }
            }
        }

        function updateNavButtons() {
            document.getElementById('prev-btn').disabled = currentStep === 1;
            if (currentStep === totalSteps) {
                document.getElementById('next-btn').classList.add('step-inactive');
                document.getElementById('print-btn').classList.remove('step-inactive');
            } else {
                document.getElementById('next-btn').classList.remove('step-inactive');
                document.getElementById('print-btn').classList.add('step-inactive');
            }
        }

        function saveStepData(step) {
            if (step === 1) {
                formData.secretaria_orgao = document.getElementById('secretaria_orgao').value;
                formData.processo_n = document.getElementById('processo_n').value;
                formData.contrato_n = document.getElementById('contrato_n').value;
                formData.contrato_folhas = document.getElementById('contrato_folhas').value;
                formData.contrato_objeto = document.getElementById('contrato_objeto').value;
                formData.contrato_assinatura = document.getElementById('contrato_assinatura').value;
                formData.contrato_valor = document.getElementById('contrato_valor').value;
                formData.contrato_vigencia_inicio = document.getElementById('contrato_vigencia_inicio').value;
                formData.contrato_vigencia_fim = document.getElementById('contrato_vigencia_fim').value;
                formData.empresa_nome = document.getElementById('empresa_nome').value;
                formData.empresa_cnpj = document.getElementById('empresa_cnpj').value;
            } else if (step === 2) {
                formData.ocorrencias_resumo = document.getElementById('ocorrencias_resumo').value;
            } else if (step === 3) {
                formData.aditivo_tipos = [];
                document.querySelectorAll('input[name="aditivo_tipo"]:checked').forEach(checkbox => {
                    formData.aditivo_tipos.push(checkbox.value);
                });

                formData.proposta_vigencia_inicio = document.getElementById('proposta_vigencia_inicio').value;
                formData.proposta_vigencia_fim = document.getElementById('proposta_vigencia_fim').value;
                formData.proposta_valor = document.getElementById('proposta_valor').value;
                formData.proposta_base_legal = document.getElementById('proposta_base_legal').value;
                formData.proposta_justificativa = document.getElementById('proposta_justificativa').value;
                formData.ppa_loa_alinhamento = document.getElementById('ppa_loa_alinhamento').value;

                formData.reserva_orcamentaria_n = document.getElementById('reserva_orcamentaria_n').value;
                formData.reserva_orcamentaria_folhas = document.getElementById('reserva_orcamentaria_folhas').value;
                formData.empenho_despesa_n = document.getElementById('empenho_despesa_n').value;
                formData.empenho_despesa_folhas = document.getElementById('empenho_despesa_folhas').value;
                formData.empenho_data = document.getElementById('empenho_data').value;

                const reajusteInicioContagemElement = document.getElementById('reajuste_inicio_contagem');
                formData.reajuste_inicio_contagem = reajusteInicioContagemElement ? reajusteInicioContagemElement.value : '';

                const dataConclusaoElement = document.getElementById('data_conclusao_periodo_aquisitivo');
                formData.data_conclusao_periodo_aquisitivo = dataConclusaoElement ? dataConclusaoElement.value : '';

                const clausulaReajusteElement = document.getElementById('clausula_reajuste');
                formData.clausula_reajuste = clausulaReajusteElement ? clausulaReajusteElement.value : '';

                const clausulaProrrogacaoElement = document.getElementById('clausula_prorrogacao');
                formData.clausula_prorrogacao = clausulaProrrogacaoElement ? clausulaProrrogacaoElement.value : '';

                formData.alteracao_quantitativa = document.getElementById('alteracao_quantitativa').checked;
                formData.alteracao_quantitativa_especificar = document.getElementById('alteracao_quantitativa_especificar').value;

                formData.alteracao_qualitativa = document.getElementById('alteracao_qualitativa').checked;
                formData.alteracao_qualitativa_especificar = document.getElementById('alteracao_qualitativa_especificar').value;

                formData.alteracoes_outras_condicoes = document.getElementById('alteracoes_outras_condicoes').checked;
                formData.alteracoes_outras_condicoes_especificar = document.getElementById('alteracoes_outras_condicoes_especificar').value;

                formData.alteracao_contratual_quantitativa = document.getElementById('alteracao_contratual_quantitativa').checked;
                formData.alteracao_contratual_quantitativa_especificar = document.getElementById('alteracao_contratual_quantitativa_especificar').value;

                formData.alteracao_contratual_qualitativa = document.getElementById('alteracao_contratual_qualitativa').checked;
                formData.alteracao_contratual_qualitativa_especificar = document.getElementById('alteracao_contratual_qualitativa_especificar').value;

                formData.alteracoes_contratuais_outras_condicoes = document.getElementById('alteracoes_contratuais_outras_condicoes').checked;
                formData.alteracoes_contratuais_outras_condicoes_especificar = document.getElementById('alteracoes_contratuais_outras_condicoes_especificar').value;


            } else if (step === 4) {
                formData.anexo_parecer = document.getElementById('anexo_parecer').checked;
                formData.anexo_parecer_folhas = document.getElementById('anexo_parecer_folhas').value;
                formData.anexo_analise = document.getElementById('anexo_analise').checked;
                formData.anexo_analise_folhas = document.getElementById('anexo_analise_folhas').value;
                formData.anexo_precos = document.getElementById('anexo_precos').checked;
                formData.anexo_precos_folhas = document.getElementById('anexo_precos_folhas').value;
                formData.anexo_capacidade = document.getElementById('anexo_capacidade').checked;
                formData.anexo_capacidade_folhas = document.getElementById('anexo_capacidade_folhas').value;
                formData.despacho_data_assinatura = document.getElementById('despacho_data_assinatura').value;
            }
        }

        function formatDate(dateString) {
            if (!dateString) return '[Data não informada]';
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        }

        function formatCurrency(value) {
            if (!value) return '[Valor não informado]';
            return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        function addApostilamento() {
            const id = Date.now();
            const newRow = { id: id, data: '', indice: '', valor: '' };
            formData.apostilamentos.push(newRow);
            renderApostilamentos();
        }

        function removeApostilamento(id) {
            formData.apostilamentos = formData.apostilamentos.filter(item => item.id !== id);
            renderApostilamentos();
        }

        function updateApostilamento(id, field, value) {
            const item = formData.apostilamentos.find(item => item.id === id);
            if (item) item[field] = value;
        }

        function renderApostilamentos() {
            const tbody = document.getElementById('apostilamentos-body');
            tbody.innerHTML = formData.apostilamentos.map(item => `
                <tr id="apostilamento-${item.id}">
                    <td class="p-1"><input type="date" value="${item.data}" onchange="updateApostilamento(${item.id}, 'data', this.value)" class="w-full p-2 text-sm border-slate-300 rounded-md"></td>
                    <td class="p-1"><input type="text" value="${item.indice}" onchange="updateApostilamento(${item.id}, 'indice', this.value)" class="w-full p-2 text-sm border-slate-300 rounded-md"></td>
                    <td class="p-1"><input type="number" value="${item.valor}" onchange="updateApostilamento(${item.id}, 'valor', this.value)" class="w-full p-2 text-sm border-slate-300 rounded-md"></td>
                    <td class="p-1"><button onclick="removeApostilamento(${item.id})" class="text-red-500 hover:text-red-700 font-bold p-2">X</button></td>
                </tr>
            `).join('');
        }

        function addAditivo() {
            const id = Date.now();
            const newRow = { id: id, tipo: 'Prorrogação de Vigência', inicio: '', fim: '' };
            formData.aditivos.push(newRow);
            renderAditivos();
        }

        function removeAditivo(id) {
            formData.aditivos = formData.aditivos.filter(item => item.id !== id);
            renderAditivos();
        }

        function updateAditivo(id, field, value) {
            const item = formData.aditivos.find(item => item.id === id);
            if (item) item[field] = value;
            renderTimeline(); // Re-render timeline on date change
        }

        function renderAditivos() {
            const tbody = document.getElementById('aditivos-body');
            tbody.innerHTML = formData.aditivos.map(item => `
                <tr id="aditivo-${item.id}">
                    <td class="p-1">
                        <select onchange="updateAditivo(${item.id}, 'tipo', this.value)" class="w-full p-2 text-sm border-slate-300 rounded-md">
                            <option value="Prorrogação de Vigência" ${item.tipo === 'Prorrogação de Vigência' ? 'selected' : ''}>Prorrogação</option>
                            <option value="Renovação Contratual" ${item.tipo === 'Renovação Contratual' ? 'selected' : ''}>Renovação</option>
                        </select>
                    </td>
                    <td class="p-1"><input type="date" value="${item.inicio}" onchange="updateAditivo(${item.id}, 'inicio', this.value)" class="w-full p-2 text-sm border-slate-300 rounded-md"></td>
                    <td class="p-1"><input type="date" value="${item.fim}" onchange="updateAditivo(${item.id}, 'fim', this.value)" class="w-full p-2 text-sm border-slate-300 rounded-md"></td>
                    <td class="p-1"><button onclick="removeAditivo(${item.id})" class="text-red-500 hover:text-red-700 font-bold p-2">X</button></td>
                </tr>
            `).join('');
        }

        function renderTimeline() {
            const container = document.getElementById('timeline-container');
            const start = formData.contrato_vigencia_inicio;
            const end = formData.contrato_vigencia_fim;

            if (!start || !end) {
                container.innerHTML = `<p id="timeline-placeholder" class="text-center text-slate-500">A linha do tempo será exibida aqui após preencher as datas de vigência.</p>`;
                return;
            }

            container.innerHTML = ''; // Clear previous

            const allDates = [start, end, ...formData.aditivos.map(a => a.fim).filter(d => d)];
            const dateObjects = allDates.map(d => new Date(d));
            const minDate = new Date(Math.min.apply(null, dateObjects));
            const maxDate = new Date(Math.max.apply(null, dateObjects));

            const totalDuration = maxDate.getTime() - minDate.getTime();
            if (totalDuration <= 0) return;

            const createMarker = (dateStr, label, color, type) => {
                const date = new Date(dateStr);
                const position = ((date.getTime() - minDate.getTime()) / totalDuration) * 100;
                const marker = document.createElement('div');
                marker.className = `absolute -top-1 w-3 h-3 rounded-full ${color} transform -translate-x-1/2 cursor-pointer group`;
                marker.style.left = `${position}%`;

                const tooltip = document.createElement('div');
                tooltip.className = 'absolute bottom-full mb-2 w-max bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2 left-1/2';
                tooltip.innerHTML = `<strong>${label}</strong><br>${formatDate(dateStr)}`;

                marker.appendChild(tooltip);
                container.appendChild(marker);
            };

            const line = document.createElement('div');
            line.className = 'absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 transform -translate-y-1/2';
            container.appendChild(line);

            createMarker(start, 'Início Original', 'bg-green-500', 'start');
            createMarker(end, 'Fim Original', 'bg-red-500', 'end');

            formData.aditivos.forEach((aditivo, index) => {
                if (aditivo.fim) {
                    createMarker(aditivo.fim, `Fim Aditivo ${index + 1}`, 'bg-blue-500', 'aditivo');
                }
            });
        }

        function toggleRenovacaoOptions() {
            const renovacaoCheckbox = document.getElementById('aditivo_tipo_renovacao');
            const renovacaoOptionsContainer = document.getElementById('renovacao_options_container');
            if (renovacaoCheckbox.checked) {
                renovacaoOptionsContainer.classList.remove('hidden');
            } else {
                renovacaoOptionsContainer.classList.add('hidden');
                document.getElementById('alteracao_quantitativa').checked = false;
                document.getElementById('alteracao_quantitativa_especificar').value = '';
                document.getElementById('alteracao_quantitativa_especificar_group').classList.add('hidden');

                document.getElementById('alteracao_qualitativa').checked = false;
                document.getElementById('alteracao_qualitativa_especificar').value = '';
                document.getElementById('alteracao_qualitativa_especificar_group').classList.add('hidden');

                document.getElementById('alteracoes_outras_condicoes').checked = false;
                document.getElementById('alteracoes_outras_condicoes_especificar').value = '';
                document.getElementById('alteracoes_outras_condicoes_especificar_group').classList.add('hidden');
            }
        }

        function toggleAlteracaoContratualOptions() {
            const alteracaoCheckbox = document.getElementById('aditivo_tipo_alteracao');
            const alteracaoOptionsContainer = document.getElementById('alteracao_options_container');
            if (alteracaoCheckbox.checked) {
                alteracaoOptionsContainer.classList.remove('hidden');
            } else {
                alteracaoOptionsContainer.classList.add('hidden');
                document.getElementById('alteracao_contratual_quantitativa').checked = false;
                document.getElementById('alteracao_contratual_quantitativa_especificar').value = '';
                document.getElementById('alteracao_contratual_quantitativa_especificar_group').classList.add('hidden');

                document.getElementById('alteracao_contratual_qualitativa').checked = false;
                document.getElementById('alteracao_contratual_qualitativa_especificar').value = '';
                document.getElementById('alteracao_contratual_qualitativa_especificar_group').classList.add('hidden');

                document.getElementById('alteracoes_contratuais_outras_condicoes').checked = false;
                document.getElementById('alteracoes_contratuais_outras_condicoes_especificar').value = '';
                document.getElementById('alteracoes_contratuais_outras_condicoes_especificar_group').classList.add('hidden');
            }
        }



        function toggleEspecificar(groupId, isChecked) {
            const groupElement = document.getElementById(groupId);
            if (groupElement) {
                if (isChecked) {
                    groupElement.classList.remove('hidden');
                } else {
                    groupElement.classList.add('hidden');
                    const inputElement = groupElement.querySelector('input');
                    if (inputElement) {
                        inputElement.value = '';
                    }
                }
            }
        }

        function generatePreview() {
            const previewContainer = document.getElementById('preview-container');

            const apostilamentosTable = formData.apostilamentos.length > 0 ? `
| Nº do Apostilamento | Data do Documento | Índice Aplicado | Valor Reajustado |
|:--------------------|:------------------|:----------------|:-----------------|
${formData.apostilamentos.map((a, i) => `| ${i + 1}                   | ${formatDate(a.data)}      | ${a.indice || 'N/D'}             | ${formatCurrency(a.valor)}    |`).join('\n')}
` : 'Nenhum apostilamento registrado.';

            const aditivosTable = formData.aditivos.length > 0 ? `
| Nº do Aditivo | Tipo                        | Início da Vigência | Término da Vigência |
|:--------------|:----------------------------|:-------------------|:--------------------|
${formData.aditivos.map((a, i) => `| ${i + 1}            | ${a.tipo} | ${formatDate(a.inicio)}       | ${formatDate(a.fim)}         |`).join('\n')}
` : 'Nenhum aditivo anterior registrado.';

            const anexosList = `
* (${formData.anexo_parecer ? 'X' : ' '}) Parecer Jurídico Favorável (Fl(s). ${formData.anexo_parecer_folhas || 'N/I'})
* (${formData.anexo_analise ? 'X' : ' '}) Análise Técnica da Área Demandante (Fl(s). ${formData.anexo_analise_folhas || 'N/I'})
* (${formData.anexo_precos ? 'X' : ' '}) Demonstração de Preços e Vantajosidade Econômica (Fl(s). ${formData.anexo_precos_folhas || 'N/I'})
* (${formData.anexo_capacidade ? 'X' : ' '}) Comprovação da Capacidade Técnica e Financeira da Contratada (Fl(s). ${formData.anexo_capacidade_folhas || 'N/I'})`;

            const brasaoImage = `<img src="https://www.saquarema.rj.gov.br/wp-content/uploads/2018/03/brasao-saquarema-768x860.png" alt="Brasão da Prefeitura Municipal de Saquarema" class="mx-auto mb-4 h-20 w-auto" onerror="this.onerror=null;this.src='https://placehold.co/80x80/E0E7FF/000000?text=Brasão';">`;

            let tipoAditivoDisplay = formData.aditivo_tipos.join(' e ') || '[Tipo não informado]';

            let renovacaoDetalhes = '';
            if (formData.alteracao_quantitativa && formData.alteracao_quantitativa_especificar) {
                renovacaoDetalhes += `   - Alteração Quantitativa: ${formData.alteracao_quantitativa_especificar}\n`;
            } else if (formData.alteracao_quantitativa) {
                renovacaoDetalhes += `   - Alteração Quantitativa: [Não especificado]\n`;
            }

            if (formData.alteracao_qualitativa && formData.alteracao_qualitativa_especificar) {
                renovacaoDetalhes += `   - Alteração Qualitativa: ${formData.alteracao_qualitativa_especificar}\n`;
            } else if (formData.alteracao_qualitativa) {
                renovacaoDetalhes += `   - Alteração Qualitativa: [Não especificado]\n`;
            }

            if (formData.alteracoes_outras_condicoes && formData.alteracoes_outras_condicoes_especificar) {
                renovacaoDetalhes += `   - Alterações em Outras Condições de Execução: ${formData.alteracoes_outras_condicoes_especificar}\n`;
            } else if (formData.alteracoes_outras_condicoes) {
                renovacaoDetalhes += `   - Alterações em Outras Condições de Execução: [Não especificado]\n`;
            }

            if (renovacaoDetalhes) {
                renovacaoDetalhes = `\n   Detalhes da Renovação:\n${renovacaoDetalhes}`;
            }

            let alteracaoContratualDetalhes = '';
            if (formData.alteracao_contratual_quantitativa && formData.alteracao_contratual_quantitativa_especificar) {
                alteracaoContratualDetalhes += `   - Alteração Quantitativa: ${formData.alteracao_contratual_quantitativa_especificar}\n`;
            } else if (formData.alteracao_contratual_quantitativa) {
                alteracaoContratualDetalhes += `   - Alteração Quantitativa: [Não especificado]\n`;
            }

            if (formData.alteracao_contratual_qualitativa && formData.alteracao_contratual_qualitativa_especificar) {
                alteracaoContratualDetalhes += `   - Alteração Qualitativa: ${formData.alteracao_contratual_qualitativa_especificar}\n`;
            } else if (formData.alteracao_contratual_qualitativa) {
                alteracaoContratualDetalhes += `   - Alteração Qualitativa: [Não especificado]\n`;
            }

            if (formData.alteracoes_contratuais_outras_condicoes && formData.alteracoes_contratuais_outras_condicoes_especificar) {
                alteracaoContratualDetalhes += `   - Alterações em Outras Condições de Execução: ${formData.alteracoes_contratuais_outras_condicoes_especificar}\n`;
            } else if (formData.alteracoes_contratuais_outras_condicoes) {
                alteracaoContratualDetalhes += `   - Alterações em Outras Condições de Execução: [Não especificado]\n`;
            }

            if (alteracaoContratualDetalhes) {
                alteracaoContratualDetalhes = `\n   Detalhes do Aditivo de Alteração Contratual:\n${alteracaoContratualDetalhes}`;
            }


            const previewText = `
${brasaoImage}
Prefeitura Municipal de Saquarema
${formData.secretaria_orgao || '[Secretaria/Órgão Gerenciador]'}

---

DESPACHO DO ORDENADOR DE DESPESAS
(Modelo CGM 001/2025 - Despacho de Termo Aditivo)
--------------------------------------------------
PROCESSO Nº: ${formData.processo_n || '[Não informado]'}
ASSUNTO: Solicitação de Análise para Termo Aditivo de ${tipoAditivoDisplay}

I. DADOS DO CONTRATO ORIGINAL
   - Número do Contrato: ${formData.contrato_n || '[Não informado]'}
   - Objeto: ${formData.contrato_objeto || '[Não informado]'}
   - Data de Assinatura do Contrato: ${formatDate(formData.contrato_assinatura)}
   - Vigência Inicial: ${formatDate(formData.contrato_vigencia_inicio)} a ${formatDate(formData.contrato_vigencia_fim)}
   - Valor Original: ${formatCurrency(formData.contrato_valor)}
   - Empresa Contratada: ${formData.empresa_nome || '[Não informado]'} (CNPJ: ${formData.empresa_cnpj || '[Não informado]'})
   - Instrumento Contratual (Fls.): ${formData.contrato_folhas || '[Não informado]'}

II. HISTÓRICO DA GESTÃO CONTRATUAL
   A. APOSTILAMENTOS DE REAJUSTAMENTOS
      ${apostilamentosTable}
     
   B. ADITIVOS ANTERIORES (PRORROGAÇÃO/RENOVAÇÃO/ALTERAÇÃO CONTRATUAL)
      ${aditivosTable}
     
   C. RESUMO DE OCORRÊNCIAS / INCIDÊNCIAS RELEVANTES
      ${formData.ocorrencias_resumo || 'Nenhuma ocorrência relevante registrada.'}

III. INFORMAÇÕES SOBRE O TERMO ADITIVO PROPOSTO
   - Tipo de Aditivo Proposto: ${tipoAditivoDisplay}
   - Período Proposto: ${formatDate(formData.proposta_vigencia_inicio)} a ${formatDate(formData.proposta_vigencia_fim)}
   - Nova Data de Término da Vigência: ${formatDate(formData.proposta_vigencia_fim)}
   - Valor Estimado do Aditivo: ${formData.proposta_valor ? formatCurrency(formData.proposta_valor) : 'Não se aplica'}
   - Base Legal: ${formData.proposta_base_legal || '[Não informada]'}
   - Justificativa: ${formData.proposta_justificativa || '[Não informada]'}
   - Alinhamento ao PPA e LOA: ${formData.ppa_loa_alinhamento || '[Não informado]'}
   - Reserva Orçamentária Nº: ${formData.reserva_orcamentaria_n || '[Não informada]'} (Fls. ${formData.reserva_orcamentaria_folhas || 'N/I'})
   - Empenho da Despesa Nº: ${formData.empenho_despesa_n || '[Não informado]'} (Fls. ${formData.empenho_despesa_folhas || 'N/I'})
   - Data do Empenho: ${formatDate(formData.empenho_data)}
   - Início Contagem Prazo Reajustamento: ${formatDate(formData.reajuste_inicio_contagem)}
   - Data de Conclusão do Período Aquisitivo para o Próximo Reajustamento: ${formatDate(formData.data_conclusao_periodo_aquisitivo)}
   - Cláusula Contratual de Reajustamento: ${formData.clausula_reajuste || '[Não informada]'}
   - Cláusula Contratual de Prorrogação de Vigência: ${formData.clausula_prorrogacao || '[Não informada]'}
${renovacaoDetalhes}
${alteracaoContratualDetalhes}

V. ANEXOS
${anexosList}

VI. SOLICITAÇÃO AO CONTROLE INTERNO
Com os dados e documentos acima, encaminho o presente processo para análise e manifestação do Controle Interno, a fim de subsidiar a decisão quanto à celebração do Termo Aditivo de ${tipoAditivoDisplay}, de acordo com a legislação vigente e as normas internas desta Instituição.

Atenciosamente,

Saquarema, ${formatDate(formData.despacho_data_assinatura || new Date().toISOString().split('T')[0])}

---

[Assinatura do Ordenador de Despesas]
[Nome Completo do Ordenador de Despesas]
[Cargo do Ordenador de Despesas]
[Matrícula/Identificação]
${formData.secretaria_orgao || '[Secretaria/Órgão Gerenciador]'}
            `;

            previewContainer.innerHTML = previewText;
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateNavButtons();
            renderApostilamentos();
            renderAditivos();
            toggleRenovacaoOptions();
            toggleAlteracaoContratualOptions();
            toggleEspecificar('alteracao_quantitativa_especificar_group', document.getElementById('alteracao_quantitativa').checked);
            toggleEspecificar('alteracao_qualitativa_especificar_group', document.getElementById('alteracao_qualitativa').checked);
            toggleEspecificar('alteracoes_outras_condicoes_especificar_group', document.getElementById('alteracoes_outras_condicoes').checked);
            toggleEspecificar('alteracao_contratual_quantitativa_especificar_group', document.getElementById('alteracao_contratual_quantitativa').checked);
            toggleEspecificar('alteracao_contratual_qualitativa_especificar_group', document.getElementById('alteracao_contratual_qualitativa').checked);
            toggleEspecificar('alteracoes_contratuais_outras_condicoes_especificar_group', document.getElementById('alteracoes_contratuais_outras_condicoes').checked);
        });