<template>
    <div>{{ ssrText }}</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            ssrText: 'Vue SSR Example'
        }
    }
}
</script>