<template>
  <div class="hello">
    <div>
      <h1>가이드 요청</h1>
    </div>
    <div>
      검색하는 부분
    </div>
    <div>
       <b-button variant="outline-success">Success</b-button>
    </div>
    <div>
      <b-card-group deck>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem;"
        class="mb-2"
      >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem;"
        class="mb-2"
      >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem;"
        class="mb-2"
      >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem;"
        class="mb-2"
      >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guideSearch',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
