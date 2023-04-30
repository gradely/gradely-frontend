import Vue from "vue";

// MIXINS
import { MixinAssets } from "@/mixins/mixin-assets";
import { MixinAuthUser } from "@/mixins/mixin-auth-user";

import { $serviceString as $string } from "@/services/service-string";
import { $serviceColor as $color } from "@/services/service-color";
import { externalPageRedirect as $redirect } from "@/services/service-route";

Vue.mixin(MixinAssets);
Vue.mixin(MixinAuthUser);

Vue.mixin({
  computed: {
    $string: () => $string,
    $color: () => $color,
  },
});

Vue.prototype.$bus = new Vue();
Vue.prototype.$redirect = $redirect;
