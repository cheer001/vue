<template>
  <div class="about">
    <!-- <h1>About:{{ $store.state.count }}</h1> -->
    <h1>About:{{ $store.state.home.count }}</h1>
    派生属性desc:{{$store.getters.desc}}
  </div>
</template>
