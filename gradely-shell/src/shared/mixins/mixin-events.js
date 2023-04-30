// TO USE EVENT BUS, PREPEND "event-bus" TO YOUR EVENTS
const MixinEvents = {
  methods: {
    handleClick(ref, text = "Please wait...", processing = true) {
      if (processing) {
        this.$refs[ref].disabled = true;
        this.$refs[
          ref
        ].innerHTML = `<div class="icon-dotted-roller gfont-17 mgr-10 animate"></div>${text}`;
      } else {
        this.$refs[ref].innerHTML = `${text}`;
        this.$refs[ref].disabled = false;
      }
    },

    // POP UP ALERT
    pushAlert(message, type) {
      this.$bus.$emit("show_response_alert", {
        message,
        type,
      });
    },

    // USED FOR PASTE EVENT ON CONTE EDITABLE DIV
    handleEditablePasteEvent(e) {
      var pastedText = undefined;
      if (window.clipboardData && window.clipboardData.getData) {
        // IE
        pastedText = window.clipboardData.getData("Text");
      } else if (e.clipboardData && e.clipboardData.getData) {
        pastedText = e.clipboardData.getData("text/plain");
      }
      e.target.textContent = pastedText;
      e.preventDefault();
      return false;
    },
  },
};

export { MixinEvents };
