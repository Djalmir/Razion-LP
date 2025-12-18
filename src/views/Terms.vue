<template>
  <section>
    <h1>Termos de Uso</h1>
    <sup>Última atualização: 22/03/2025</sup>

    <p class="tip">Estes Termos de Uso regulam o acesso e a utilização do site e das ferramentas oferecidas pela Razion. Ao utilizar nossos serviços, você concorda com os termos descritos abaixo.</p>

    <h2>1. Aceitação dos Termos</h2>
    <p>Ao acessar e utilizar a Plataforma, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você não concorda com qualquer parte dos termos, não deve utilizar nossos serviços.</p>

    <h2>2. Uso da Plataforma</h2>
    <p>2.1. O uso das ferramentas da Razion deve ser feito de forma responsável e em conformidade com a legislação vigente.</p>
    <p>2.2. Você não pode usar a Plataforma para fins ilegais, ofensivos, fraudulentos ou que violem direitos de terceiros.</p>
    <p>2.3. A Razion pode, a seu critério, modificar, suspender ou encerrar qualquer serviço sem aviso prévio.</p>

    <h2>3. Conta de Usuário</h2>
    <p>3.1. Algumas ferramentas podem exigir cadastro. Ao se cadastrar, você deve fornecer informações precisas e atualizadas.</p>
    <p>3.2. Você é responsável por manter a segurança de sua conta e senha. Qualquer atividade realizada em sua conta será de sua responsabilidade.</p>

    <h2>4. Privacidade</h2>
    <p>Nossa <RouterLink :to="{ name: 'Privacy' }" target="_blank">Política de Privacidade</RouterLink> explica como coletamos, usamos e protegemos seus dados. Ao utilizar a Plataforma, você concorda com essa política.</p>

    <h2>5. Propriedade Intelectual</h2>
    <p>5.1. Todo o conteúdo da Plataforma, incluindo textos, logotipos e design, é protegido por direitos autorais e pertence à Razion ou a seus licenciadores.</p>
    <p>5.2. Você não pode copiar, distribuir ou modificar qualquer parte da Plataforma sem autorização prévia.</p>

    <h2>6. Isenção de Responsabilidade</h2>
    <p>6.1. A Razion oferece seus serviços "como estão", sem garantias de funcionamento ininterrupto ou livre de erros.</p>
    <p>6.2. Não nos responsabilizamos por prejuízos decorrentes do uso da Plataforma, incluindo perda de dados ou falhas técnicas.</p>

    <h2>7. Modificações nos Termos</h2>
    <p>Podemos atualizar estes Termos de Uso a qualquer momento. O uso contínuo da Plataforma após alterações implica aceitação dos novos termos.</p>

    <h2>8. Contato</h2>
    <p>Caso tenha dúvidas, entre em contato pelo e-mail <a href="mailto:djalmir_miodutzki@hotmail.com" target="_blank">djalmir_miodutzki@hotmail.com</a> ou pelo Telegram <a href="https://t.me/RazionSoftwares" target="_blank">@RazionSoftwares</a>.</p>

    <b class="thanks">Obrigado por utilizar a Razion!</b>
  </section>
</template>

<style scoped>
section {
  width: 90vw;
  max-width: 1024px;
  margin: 33px auto;
}

h1 {
  font-size: 1.5rem;
}

h2 {
  font-size: 1.7rem;
  margin: 33px 0 7px;
}

p.tip {
  margin: 33px 17px;
  text-align: center;
  font-size: 1.1rem;
  background: var(--primary-transparent);
  padding: 7px;
  border-radius: .3rem;
  box-shadow: var(--box-shadow);
}

p {
  margin: 7px 17px;
}

.thanks {
  display: block;
  margin: 33px 0 0;
}
</style>