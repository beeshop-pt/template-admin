<template>
    <div class="container">
        <div class="centered-div">
            <div style="width: 500px" class="card">
                <div class="card-content">
                    <div class="field">
                        <AppLogo/>
                        <p style="text-align: center; font-size: 22px; font-weight: bold">Bem vindo ao Beeshop!</p>
                    </div>
                    <div class="field">
                        <p style="text-align: center">
                            Antes de começar a utilizar todas as funcionalidades do Beeshop, será necessário fazer algumas configurações:
                            configurar o logotipo, o favicon, o email geral, o email de notificações e o limite máximo de ficheiros.
                        </p>
                    </div>
                    <div style="margin: auto; width: 50%" class="field is-grouped">
                        <div class="control">
                            <button type="submit" id="welcome-later" class="button is-secondary">Mais tarde</button>
                        </div>
                        <div class="control">
                            <button type="submit" id="welcome-start" class="button is-link">Começar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style>

body {
    background-color: #f8f8f8;
}

.centered-div {
    height: 100vh;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
