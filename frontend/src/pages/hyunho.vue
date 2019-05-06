<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

        <v-ons-header class ="center">TourSearch</v-ons-header>


        <v-ons-list-item :modifier="md ? 'nodivider' : ''">


            <v-ons-search-input maxlength="20" placeholder="Search" v-model="search"></v-ons-search-input>

            <v-ons-select style="width: 120px" v-model ="selectedLocal " >
                <option v-for="loitem in localitems"  :value="loitem.value" >
                    {{ loitem.text }}
                </option>
            </v-ons-select>

            <v-ons-select style="width: 120px" v-model="selectedThema" >
                <option v-for="thitem in themaitems"  :value="thitem.value" >
                    {{ thitem.text }}
                </option>
            </v-ons-select>

            <v-ons-button class="button-margin">Search</v-ons-button>

        </v-ons-list-item>

        <v-ons-list-item>
            <div class="center">
                Local is {{ selectedLocal }} !
            </div>
        </v-ons-list-item>
        <v-ons-list-item>
            <div class="center">
                Thema is {{ selectedThema }} !
            </div>
        </v-ons-list-item>
        <v-ons-list-item>

            <div class="right right-label">
                Hello {{ search || 'blabla' }}!<v-ons-icon icon="fa-hand-spock-o" size="lg" class="right-icon"></v-ons-icon>
            </div>

        </v-ons-list-item>


    </v-ons-page>
</template>

<script>
    export default {
        data() {
            return {

                search: '',
                spdOpen: false,

                localitems: [
                    { value: '미설정', text: 'Local' },
                    { value: '서울', text: '서울' },
                    { value: '인천', text: '인천' },
                    { value: '대전', text: '대전' },
                    { value: '대구', text: '대구' },
                    { value: '부산', text: '부산' }
                ],
                selectedLocal: '미설정',

                themaitems: [
                    { value: '미설정', text: 'Thema' },
                    { value: '힐링', text: '힐링' },
                    { value: '쇼핑', text: '쇼핑' },
                    { value: '효도', text: '효도' },
                    { value: '관광', text: '관광' },
                    { value: '맛집', text: '맛집' }
                ],
                selectedThema: '미설정'
            };
        }


    };
</script>

<style scoped>
    .button-margin {
        margin: 6px 0;
    }
</style>