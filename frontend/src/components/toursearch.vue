<template>
    <div >
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">여행 상품 보기</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>상품 등록</b-nav-item>
                </b-navbar-nav>




                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-form>
                        <b-form-select size="sm"  v-model="localValue" :options="localoptions"></b-form-select>
                        <b-form-select size="sm"  v-model="themaValue" :options="themaoptions"></b-form-select>
                    </b-nav-form>


                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="searchValue"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit" v-on:click="con">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>User</em></template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>


            <b-card-group deck style="max-width: 90rem"  >
                <div style="border: 10px solid white; float: left; width: 30%; padding:10px;">
                <b-card title="춘천" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
                    <b-card-text>
                        태홍이형은 태홍이형이다 고로 태홍이형은 태홍이형이다.
                    </b-card-text>
                    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
                </b-card>
                </div>

                <div style="border: 10px solid white; float: left; width: 30%; padding:10px;">
                <b-card title="대구" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
                    <b-card-text>
                        혐홓몋뫃ㅁ혐호며홈혀ㅗㅁ혀모혀ㅗ며호며호며홓
                    </b-card-text>
                    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
                </b-card>
                </div>

                <div style="border: 10px solid white; float: left; width: 30%; padding:10px;">
                <b-card title="분당" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
                    <b-card-text>
                        뚜루리 승워니 뚜루뚜뚤루ㄸ루루ㄸㄹ루ㄸ루ㄸ루루n.
                    </b-card-text>
                    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
                </b-card>
                </div>

                <div style="border: 10px solid white; float: left; width: 30%; padding:10px;">
                    <b-card title="서산" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
                    <b-card-text>
                        T기요오오오오오오오옹
                    </b-card-text>
                    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
                </b-card>
                </div>

                <div style="border: 10px solid white; float: left; width: 30%; padding:10px;">
                <b-card title="대전" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
                    <b-card-text>
                        기훈이는 기훈이다 기훈기훈기후니기후니기후니.
                    </b-card-text>
                    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
                </b-card>
                </div>

                <div style="border: 10px solid white; float: left; width: 30%; padding:10px;;">
                <b-card title="광주" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
                    <b-card-text>
                        This is a wider card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                    </b-card-text>
                    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
                </b-card>
                </div>
            </b-card-group>

        </div>
</template>

<script>
    export default {
        name: "toursearch",
        data() {
            return {

                contacts:[],
                counter: 0,
                searchValue: '',
                exValue:[5],

                localValue: null,
                localoptions: [
                    { value: null, text: 'Local' },
                    { value: '춘천', text: '춘천' },
                    { value: '대구', text: '대구' },
                    { value: '분당', text: '분당' },
                    { value: '서산', text: '서산' },
                    { value: '대전', text: '대전' }
                ],
                themaValue: null,
                themaoptions: [
                    { value: null, text: 'Thema' },
                    { value: '힐링', text: '힐링' },
                    { value: '쇼핑', text: '쇼핑' },
                    { value: '효도', text: '효도' },
                    { value: '관광', text: '관광' },
                    { value: '맛집', text: '맛집' }
                ]
            }
        },
        methods: {

            con(){

                this.exValue[0] = this.localValue;
                this.exValue[1] = this.themaValue;
                this.exValue[2] = this.searchValue;
            },
        }
    }
</script>

<style scoped>

</style>