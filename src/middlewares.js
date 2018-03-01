export default config => ({
  middleware: function({ useBeforeRequest, useAfterResponse } = {}) {
    if (useBeforeRequest) {
      this.isUseBeforeCallbackSupplied = true;
      this.useBeforeRequest = useBeforeRequest;
    }

    if (useAfterResponse) {
      this.isUseAfterCallbackSupplied = true;
      this.useAfterResponse = useAfterResponse;
    }
  },
  isUseBeforeCallbackSupplied: false,
  isUseAfterCallbackSupplied: false,
  useBeforeRequest: null,
  useAfterResponse: null
});
