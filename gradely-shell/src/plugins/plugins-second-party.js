import Vue from "vue";

// MIXINS
import { MixinAssets } from "@/shared/mixins/mixin-assets";
import { MixinAuthUser } from "@/shared/mixins/mixin-auth-user";
import { MixinEvents } from "../shared/mixins/mixin-events";

// SERVICES
import { $serviceString as $string } from "@/services/service-string";
import { $serviceColor as $color } from "@/services/service-color";
import { $serviceDoc as $doc } from "@/services/service-docs";
import { $serviceDate as $date } from "@/services/service-date";
import { $serviceValidators as $validate } from "@/services/service-validators";
import { externalPageRedirect as $redirect } from "@/services/service-route";

// GLOBAL COMPONENTS
Vue.component("empty-content-state", () =>
  import(
    /* webpackChunkName: 'emptycontentstate' */ "@/shared/components/empty-content-state"
  )
);

Vue.mixin(MixinAssets);
Vue.mixin(MixinAuthUser);
Vue.mixin(MixinEvents);

Vue.mixin({
  computed: {
    $string: () => $string,
    $color: () => $color,
    $doc: () => $doc,
    $date: () => $date,
    $validate: () => $validate,
  },
});

Vue.prototype.$bus = new Vue();
Vue.prototype.$redirect = $redirect;
