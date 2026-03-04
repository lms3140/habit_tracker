import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), details, summary, [tabindex]:not([tabindex="-1"])';

type ModalProps = {
  isOpen: boolean;
  isCloseBlocked: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

export function Modal({
  isOpen,
  onRequestClose,
  isCloseBlocked,
  children,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const isComposingRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;
    const content = contentRef.current;
    if (!content) return;

    const focusables = Array.from(
      content.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    (focusables[0] ?? content).focus();

    const handler = (e: KeyboardEvent) => {
      if (
        (e as any).isComposing ||
        (e as any).nativeEvent?.isComposing ||
        isComposingRef.current
      ) {
        return;
      }
      if (e.key === "Escape") {
        if (isCloseBlocked) return;
        e.preventDefault();
        onRequestClose();
        return;
      }

      if (e.key !== "Tab") return;

      const root = contentRef.current;
      if (!root) return;

      const items = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (items.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      if (lastActiveRef.current && document.contains(lastActiveRef.current)) {
        lastActiveRef.current.focus();
      }
      lastActiveRef.current = null;
    };
  }, [isOpen, onRequestClose, isCloseBlocked]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
      onPointerDown={() => {
        if (!isCloseBlocked) {
          onRequestClose();
        }
      }}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className="bg-ds-bg border border-ds-border rounded-2xl shadow-xl max-w-lg w-full p-6 z-50"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
