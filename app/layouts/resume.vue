<template>
  <div class="app-shell">
    <div class="resume">
      <ProfileSidebar />
      <main class="resume__main">
        <slot />
      </main>
    </div>
    <SiteFooter />
    <ProjectRequestModal />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.resume {
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
}

.resume__main {
  padding: 3.5rem 3.5rem 5rem;
  display: flex;
  flex-direction: column;
  gap: var(--gap-section);
  width: 100%;
}

@media (min-width: 901px) {
  .resume {
    flex-direction: row;
    align-items: stretch;
  }

  .resume :deep(.sidebar) {
    width: var(--sidebar-width);
    min-width: 300px;
    max-width: 400px;
    position: sticky;
    top: 0;
    height: 100vh;
    align-self: flex-start;
  }

  .resume__main {
    flex: 1;
    margin: 0;
    padding: 7rem 3.5rem 3.5rem 3.5rem;
  }
}

@media (max-width: 1100px) and (min-width: 901px) {
  .resume__main {
    padding: 3rem 2.5rem 4rem;
  }
}

@media (max-width: 900px) {
  .resume__main {
    padding: 2.75rem 1.5rem 4rem;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .resume__main {
    padding: 2.25rem 1.25rem 3.5rem;
    gap: 2.75rem;
  }
}
</style>
