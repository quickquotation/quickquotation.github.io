<template>
    <div class="row">
        <ClientDetails />
        <EmptyList />
        <TaskList />
        <PrintPage />
    </div>
</template>
<script>
import EmptyList from '../components/EmptyList.vue';
import ClientDetails from '../components/ClientDetails.vue';
import TaskList from '../components/TaskList.vue';
import PrintPage from '../components/PrintPage.vue';
export default {
    components:{
        EmptyList,
        ClientDetails,
        TaskList,
        PrintPage
    }
}
</script>