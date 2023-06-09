<template>
    <div class="list-resumen">
        <h4 class="pb-3 font-semibold">Tabla resumen</h4>
        <div class="item">
            <span><i class="fa-solid fa-user"></i> Clientes abastecidos</span>
            <span>{{ resumen.clientesAbastecidos }}</span>
        </div>
        <div class="item">
            <span> <i class="fa-solid fa-truck-fast"></i> Ciscternas en operación</span>
            <span> {{ resumen.cisternasOperativas }}</span>
        </div>
        <div class="item">
            <span><i class="fa-solid fa-gas-pump"></i> Galones abastecidos</span>
            <span>{{ resumen.galonesTotales }}</span>
        </div>
        <div class="item">
            <span><i class="fa-solid fa-truck-field-un"></i> Unidades abastecidas </span>
            <span>{{ resumen.unidadesAbastecidas }}</span>
        </div>
        <div class="item">
            <span><i class="fa-solid fa-file"></i> Ticket emitidos</span>
            <span>{{ resumen.ticketsEmitidos }}</span>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        resumen: Object
    }
};
</script>
<style lang="scss">
.list-resumen {
    width: 100%;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 5%;

    h4 {
        text-align: center;
    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #F9FBFF;
        padding: 10px;
        border-radius: 10px;
        margin: 10px;

        span {
            padding: 0 10px;
            font-size: 13px;
        }
    }
}

@media screen and (max-width: 660px) {
    h4{
        font-size: 13px;
    }
    .list-resumen {
        margin-bottom: 10px;
    }
}
</style>
  