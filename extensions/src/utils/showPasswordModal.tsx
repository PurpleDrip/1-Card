import { createRoot } from "react-dom/client";
import PasswordModal from "../components/modals/PasswordModal";

function showPasswordModal(message: string): Promise<string | null> {
  return new Promise((resolve) => {
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);

    const root = createRoot(modalRoot);

    const cleanup = () => {
      root.unmount();
      modalRoot.remove();
    };

    root.render(
      <PasswordModal
        message={message}
        onSubmit={(password) => {
          cleanup();
          resolve(password);
        }}
        onCancel={() => {
          cleanup();
          resolve(null);
        }}
      />
    );
  });
}

export default showPasswordModal;
