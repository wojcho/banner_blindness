import { useRef, useState } from "react";
import {
  ActionIcon,
  Box,
  Group,
  Text,
} from "@mantine/core";
import {
  CheckIcon,
  DotsSixVerticalIcon,
} from "@phosphor-icons/react";

interface SliderCaptchaProps {
  onSuccess?: () => void;
  onReset?: () => void;
}

export function SliderCaptcha({
  onSuccess,
  onReset,
}: SliderCaptchaProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [completed, setCompleted] = useState(false);

  const THUMB_SIZE = 44;

  const getMaxPosition = () => {
    const width = trackRef.current?.getBoundingClientRect().width ?? 0;
    return Math.max(0, width - THUMB_SIZE - 8);
  };

  const updatePosition = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;

    const max = getMaxPosition();
    const next = Math.max(
      0,
      Math.min(clientX - rect.left - THUMB_SIZE / 2, max)
    );

    setPosition(next);
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (completed) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (!dragging || completed) return;
    updatePosition(event.clientX);
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (!dragging) return;

    setDragging(false);

    const max = getMaxPosition();

    if (position >= max * 0.9) {
      setPosition(max);
      setCompleted(true);
      onSuccess?.();
    } else {
      setPosition(0);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (completed) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();

      const max = getMaxPosition();
      const next = Math.min(position + 20, max);

      setPosition(next);

      if (next >= max) {
        setCompleted(true);
        onSuccess?.();
      }
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition(Math.max(position - 20, 0));
    }

    if (event.key === "Enter" && position >= getMaxPosition() * 0.9) {
      setCompleted(true);
      setPosition(getMaxPosition());
      onSuccess?.();
    }
  };

  const reset = () => {
    setPosition(0);
    setCompleted(false);
    setDragging(false);
    onReset?.();
  };

  return (
    <Box w="100%">
      <Box
        ref={trackRef}
        pos="relative"
        h={52}
        w="100%"
        style={{
          background: completed
            ? "#e8f5e9"
            : dragging
              ? "#edf6ff"
              : "#f1f3f5",

          border: `1px solid ${
            completed
              ? "#40a66a"
              : dragging
                ? "#74c0fc"
                : "#dee2e6"
          }`,

          borderRadius: 6,
          overflow: "hidden",
          touchAction: "none",
          userSelect: "none",

          transition: "background 150ms, border-color 150ms",
        }}
      >
        {/* Progress background */}
        <Box
          pos="absolute"
          left={0}
          top={0}
          h="100%"
          w={position + THUMB_SIZE + 8}
          style={{
            background: completed
              ? "#d3f9d8"
              : dragging
                ? "#d0ebff"
                : "#e7f5ff",
            transition: dragging ? "none" : "width 150ms",
          }}
        />

        {/* Instruction */}
        <Group
          justify="center"
          align="center"
          h="100%"
          style={{
            pointerEvents: "none",
            opacity: completed ? 0 : 1,
          }}
        >
          <Text size="sm" fw={500} c="dimmed">
            Drag to verify
          </Text>
        </Group>

        {/* Draggable button */}
        <ActionIcon
          size={THUMB_SIZE}
          radius={5}
          variant="filled"
          color={completed ? "green" : "white"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            setDragging(false);
            setPosition(0);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Drag right to verify"
          styles={{
            root: {
              position: "absolute",
              top: 3,
              left: position + 3,
              zIndex: 2,

              backgroundColor: completed
                ? "#40a66a"
                : dragging
                  ? "#228be6"
                  : "#ffffff",

              color: completed || dragging
                ? "#ffffff"
                : "#228be6",

              border: `1px solid ${
                completed
                  ? "#40a66a"
                  : dragging
                    ? "#1c7ed6"
                    : "#dee2e6"
              }`,

              boxShadow: dragging
                ? "0 3px 10px rgba(34, 139, 230, 0.35)"
                : "0 1px 3px rgba(0,0,0,.12)",

              transform: dragging ? "scale(1.08)" : "scale(1)",

              cursor: completed
                ? "default"
                : dragging
                  ? "grabbing"
                  : "grab",

              transition: dragging
                ? "background-color 120ms, box-shadow 120ms, transform 120ms"
                : "background-color 150ms, box-shadow 150ms, transform 150ms, left 150ms",

              "&:hover": {
                backgroundColor: completed
                  ? "#40a66a"
                  : dragging
                    ? "#228be6"
                    : "#e7f5ff",

                borderColor: completed ? "#40a66a" : "#228be6",

                boxShadow: "0 2px 7px rgba(34, 139, 230, 0.2)",
              },

              "&:active": {
                backgroundColor: dragging ? "#228be6" : "#e7f5ff",
                transform: "scale(1.08)",
              },

              "&:focus-visible": {
                outline: "2px solid #228be6",
                outlineOffset: 3,
              },
            },
          }}
        >
          {completed ? (
            <CheckIcon size={22} weight="bold" />
          ) : (
            <DotsSixVerticalIcon
              size={22}
              weight={dragging ? "bold" : "regular"}
            />
          )}
        </ActionIcon>
      </Box>

      <Group justify="space-between" mt={8}>
        <Text size="xs" c={completed ? "green" : "dimmed"}>
          {completed ? "Verification completed" : "Slide the button to the right"}
        </Text>

        {completed && onReset && (
          <Text
            size="xs"
            c="blue"
            style={{ cursor: "pointer" }}
            onClick={reset}
          >
            Reset
          </Text>
        )}
      </Group>
    </Box>
  );
}
