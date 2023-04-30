import Vue from 'vue';

// MIXINS
import { MixinAssets } from '@/mixins/mixin-assets';
import { MixinAuthUser } from '@/mixins/mixin-auth-user';
import { MixinEvents } from '@/mixins/mixin-events';
import { MixinUtilities } from '@/mixins/mixin-utilities';

// SERVICES
import { $serviceString as $string } from "@/services/service-string";
import { $serviceDoc as $doc } from "@/services/service-docs";
import { $serviceColor as $color } from "@/services/service-color";
import { $serviceDate as $date } from "@/services/service-date";
import { $serviceValidators as $validate } from "@/services/service-validators";
import { externalPageRedirect as $redirect } from "@/services/service-route";

Vue.mixin(MixinAssets);
Vue.mixin(MixinAuthUser);
Vue.mixin(MixinEvents);
Vue.mixin(MixinUtilities);
Vue.mixin({
  computed: {
    $string: () => $string,
    $doc: () => $doc,
    $color: () => $color,
    $date: () => $date,
    $validate: () => $validate,
  },
});

Vue.prototype.$bus = new Vue();
Vue.prototype.$redirect = $redirect;
