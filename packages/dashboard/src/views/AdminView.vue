<template>ADMIN</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useApi } from '@cmmv/client'
const api = useApi()
onBeforeMount(async () => await api.checkSession())
</script>
