import { useState } from 'react';

export interface Graphic {
  name: string;
  description: string;
  date: string;
  image: File | null;
}

const useGraphics = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [graphics, setGraphics] = useState<Graphic[]>([
    { name: 'test', description: 'Test description', date: '2 September, 2024', image: null },
    { name: 'abc', description: 'ABC description', date: '9 August, 2024', image: null },
    { name: 'myGraph1', description: 'My Graph 1 description', date: '6 August, 2024', image: null },
  ]);
  const [newGraphic, setNewGraphic] = useState<Graphic>({
    name: '',
    description: '',
    date: '',
    image: null,
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentGraphic, setCurrentGraphic] = useState<Graphic | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Add editingIndex state

  const handleOpenPopup = (graphic?: Graphic, index?: number) => {
    if (graphic && index !== undefined) {
      setNewGraphic(graphic);
      setEditingIndex(index);
    } else {
      setNewGraphic({ name: '', description: '', date: '', image: null });
      setEditingIndex(null);
    }
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewGraphic({ name: '', description: '', date: '', image: null });
    setEditingIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewGraphic((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewGraphic((prev) => ({ ...prev, image: file }));
  };

  const handleSaveGraphic = () => {
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const graphicToSave = { ...newGraphic, date: currentDate };

    if (editingIndex !== null) {
      const updatedGraphics = [...graphics];
      updatedGraphics[editingIndex] = graphicToSave;
      setGraphics(updatedGraphics);
    } else {
      setGraphics((prev) => [...prev, graphicToSave]);
    }

    handleClosePopup();
  };

  const handlePreviewGraphic = (graphic: Graphic) => {
    setCurrentGraphic(graphic);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setCurrentGraphic(null);
  };

  return {
    isPopupOpen,
    isPreviewOpen,
    graphics,
    newGraphic,
    hoveredIndex,
    currentGraphic,
    editingIndex, // Make sure this is included in the return
    handleOpenPopup,
    handleClosePopup,
    handleInputChange,
    handleFileChange,
    handleSaveGraphic,
    handlePreviewGraphic,
    handleClosePreview,
    setHoveredIndex,
  };
};

export default useGraphics;