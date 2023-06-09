<template>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gray-400 text-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Usuario
                </th>
                <th scope="col" class="px-6 py-3">
                    Empresa
                </th>
                <th scope="col" class="px-6 py-3">
                    Estado
                </th>
                <th scope="col" class="px-6 py-3">
                    Acciones
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b"
                v-for="usuario in listaUsuarios" :key="usuario.id">
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="../assets/icon-user.png" alt="Icon user">
                    <div class="pl-3">
                        <div class="text-gray-800 font-medium">{{ usuario.usuario }}</div>
                    </div>
                </th>
                <td class="px-6 py-4 text-gray-800">
                    {{ usuario.conductor }}
                </td>
                <td class="px-6 py-4 text-gray-800">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Activo
                    </div>
                </td>
                <td class="px-6 py-4">
                    <a href="#"
                        class="mr-2 p-2 font-medium text-white dark:text-white hover:underline bg-green-500 rounded-lg">Editar</a>
                    <a href="#"
                        class="p-2 font-medium text-white dark:text-white hover:underline bg-red-500 rounded-lg">Eliminar</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default ({
    name: "TableUsers",
    props: {
        listaUsuarios: Array
    }
})
</script>