<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>작성자 : {{item.UserID }}</v-ons-card>
        <v-ons-card>제목 : {{item.RecruitTitle}}</v-ons-card>
        <v-ons-card>지역 : {{item.RecruitLocation}}</v-ons-card>
        <v-ons-card>내용 : {{item.RecruitContent}}</v-ons-card>
        <v-ons-card>날짜 : {{item.From_time}} 부터 {{item.To_time}} 까지</v-ons-card>
        <v-ons-card>인원 : {{item.RecruitPeopleNumber}}</v-ons-card>
        <v-ons-card>작성시간 : {{item.WriteTime}}</v-ons-card>
    </v-ons-page>
</template>

<script>
    export default {
        data() {
            return {
                item : this.$store.state.item
            };
        }
    };
</script>

<style scoped>

</style>