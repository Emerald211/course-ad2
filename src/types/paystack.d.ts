export {};

declare global {
  interface PaystackResponse {
    reference: string;
    status: string;
  }

  interface PaystackCustomField {
    display_name: string;
    variable_name: string;
    value: string;
  }

  interface PaystackConfig {
    key: string;
    email: string;
    amount: number;
    currency: string;
    ref: string;
    metadata: {
      custom_fields: PaystackCustomField[];
    };
    callback: (response: PaystackResponse) => void;
    onClose: () => void;
  }

  interface PaystackPop {
    setup: (config: PaystackConfig) => {
      openIframe: () => void;
    };
  }

  interface Window {
    PaystackPop: PaystackPop;
  }
}
