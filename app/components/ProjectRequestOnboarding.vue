<script setup lang="ts"></script>

<template>
  <div class="prm-onboarding">
    <h1 class="prm-onboarding__title">Vamos organizar seu projeto</h1>
    <p>
      São algumas etapas, conforme o que você escolher. <strong>Não precisa saber nada de
      tecnologia</strong> — você me conta o problema e o que você quer, do seu jeito, e a parte
      técnica é comigo.
    </p>
    <p>
      Quanto mais detalhe você der, melhor eu consigo transformar isso no seu projeto. Só as
      perguntas mais importantes são obrigatórias; o resto você responde à vontade.
    </p>
    <p>
      Nada é salvo em servidor nenhum: suas respostas só saem daqui quando você aperta "Enviar via
      WhatsApp" no final. Depois é só aguardar que eu te respondo por lá.
    </p>
  </div>
</template>

<style scoped>
.prm-onboarding {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.prm-onboarding__title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.25rem;
}

.prm-onboarding p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 52ch;
}
</style>
