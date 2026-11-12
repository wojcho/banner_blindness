import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Container,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ImageSquareIcon,
  XIcon,
} from "@phosphor-icons/react";
import classes from "./PhotoGallery.module.css";

export interface GalleryPhoto {
  id: string;
  src: string;
  name: string;
  description: string;
}

interface PhotoGalleryPortalProps {
  photos?: GalleryPhoto[];
  targetPhotoId?: string;
  onTargetPhotoSelected?: (photo: GalleryPhoto) => void;
}

const mockPhotos: GalleryPhoto[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    name: "Quiet mornings",
    description: "A peaceful lake surrounded by mountains.",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900",
    name: "Golden hour",
    description: "The last sunlight of a summer evening.",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    name: "Open roads",
    description: "Somewhere far away from everything.",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900",
    name: "Wildlife",
    description: "A quiet moment in the forest.",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900",
    name: "Mountain escape",
    description: "A view worth remembering.",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    name: "Into the woods",
    description: "Afternoon light between the trees.",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900",
    name: "Ocean breeze",
    description: "Waves rolling onto the shore.",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900",
    name: "Little adventures",
    description: "A place discovered by accident.",
  },
];

export function PhotoGalleryPortal({
  photos = mockPhotos,
  targetPhotoId,
  onTargetPhotoSelected,
}: PhotoGalleryPortalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const triggeredRef = useRef<string | null>(null);

  const selectedPhoto =
    selectedIndex !== null ? photos[selectedIndex] : null;

  const selectPhoto = (index: number) => {
    const photo = photos[index];

    setSelectedIndex(index);
    setAnimating(false);
    open();

    if (
      photo.id === targetPhotoId &&
      triggeredRef.current !== photo.id
    ) {
      triggeredRef.current = photo.id;
      setAnimating(true);

      // Let the modal render before starting the animation.
      requestAnimationFrame(() => {
        setTimeout(() => {
          onTargetPhotoSelected?.(photo);
        }, 650);
      });
    }
  };

  const navigate = (direction: number) => {
    if (selectedIndex === null || !photos.length) return;

    const nextIndex =
      (selectedIndex + direction + photos.length) % photos.length;

    selectPhoto(nextIndex);
  };

  useEffect(() => {
    if (!opened) {
      setSelectedIndex(null);
      setAnimating(false);
    }
  }, [opened]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <ImageSquareIcon size={28} weight="duotone" />
            <Box>
              <Title order={2}>Photo Gallery</Title>
              <Text size="sm" c="dimmed">
                Retained echoes of points in time
              </Text>
            </Box>
          </Group>

          <Badge variant="light" color="gray" size="lg">
            {photos.length} photos
          </Badge>
        </Group>

        <SimpleGrid
          cols={{ base: 2, xs: 2, sm: 3, md: 4 }}
          spacing="md"
        >
          {photos.map((photo) => (
            <UnstyledButton
              key={photo.id}
              className={classes.photoCard}
              onClick={() => selectPhoto(photos.indexOf(photo))}
            >
              <Box className={classes.imageWrapper}>
                <Image
                  src={photo.src}
                  alt={photo.name}
                  className={classes.thumbnail}
                />
              </Box>

              <Stack gap={3} mt="xs">
                <Text fw={600} size="sm" lineClamp={1}>
                  {photo.name}
                </Text>
                <Text size="xs" c="dimmed" lineClamp={2}>
                  {photo.description}
                </Text>
              </Stack>
            </UnstyledButton>
          ))}
        </SimpleGrid>
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
        withCloseButton={false}
        padding={0}
        centered
        styles={{
          content: { background: "#101010" },
          body: { height: "100%" },
        }}
      >
        {selectedPhoto && (
          <Box className={classes.viewer}>
            <Group
              justify="space-between"
              className={classes.viewerHeader}
            >
              <Text c="white" size="sm">
                {selectedIndex! + 1} / {photos.length}
              </Text>

              <ActionIcon
                variant="subtle"
                color="white"
                size="lg"
                onClick={close}
                aria-label="Close viewer"
              >
                <XIcon size={24} />
              </ActionIcon>
            </Group>

            <Box className={classes.imageStage}>
              <ActionIcon
                className={classes.navButton}
                variant="filled"
                color="dark"
                radius="xl"
                onClick={() => navigate(-1)}
                aria-label="Previous photo"
              >
                <ArrowLeftIcon size={20} />
              </ActionIcon>

              <Box
                key={selectedPhoto.id}
                className={`${classes.largeImageWrapper} ${
                  animating ? classes.targetAnimation : ""
                }`}
              >
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.name}
                  fit="contain"
                  className={classes.largeImage}
                />

                {animating && (
                  <Box className={classes.successOverlay}>
                    <CheckCircleIcon
                      size={64}
                      weight="fill"
                      color="white"
                    />
                  </Box>
                )}
              </Box>

              <ActionIcon
                className={classes.navButton}
                variant="filled"
                color="dark"
                radius="xl"
                onClick={() => navigate(1)}
                aria-label="Next photo"
              >
                <ArrowRightIcon size={20} />
              </ActionIcon>
            </Box>

            <Stack
              align="center"
              gap={6}
              className={classes.photoDetails}
            >
              <Title order={3} c="white" ta="center">
                {selectedPhoto.name}
              </Title>

              <Text c="gray.5" ta="center" size="sm">
                {selectedPhoto.description}
              </Text>

              {selectedPhoto.id === targetPhotoId && (
                <Badge color="green" variant="light" mt="xs">
                  Special memory
                </Badge>
              )}
            </Stack>
          </Box>
        )}
      </Modal>
    </Container>
  );
}
