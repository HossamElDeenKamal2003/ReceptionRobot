// v-intersect.js
export const intersect = {
beforeMount(el, binding) {
    el._intersect = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        binding.value(entry);
        }
    });
    });

    el._intersect.observe(el);
},
unmounted(el) {
    el._intersect.disconnect();
},
};

export default {
install(app) {
    app.directive("intersect", intersect);
},
};
