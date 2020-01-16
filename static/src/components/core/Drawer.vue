<template>
  <v-navigation-drawer
    id="app-drawer"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
    permanent
  >
    <v-list-item href="/">
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :href="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "service A",
          icon: "mdi-view-dashboard",
          to: "/servicea"
        },
        {
          title: "service B",
          icon: "mdi-image",
          to: "/serviceb"
        },
        {
          title: "service C",
          icon: "mdi-account",
          to: "/serviceb"
        },
        {
          title: "service D",
          icon: "mdi-account-alert",
          to: "/serviceb"
        },
        {
          title: "service E",
          icon: "mdi-account-alert-outline",
          to: "/serviceb"
        }
      ],
      right: null
    };
  }
};
</script>
