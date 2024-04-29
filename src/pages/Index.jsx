// Complete the Index page component here
// Use chakra-ui and react-icons for UI components
import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Input, Text, VStack, HStack, Tag, Textarea, useToast } from "@chakra-ui/react";
import { FaSearch, FaEnvelope, FaPlus, FaTrash, FaSave } from "react-icons/fa";

const Index = () => {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const toast = useToast();

  const supabaseUrl = "https://mnwefvnykbgyhbdzpleh.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg";

  useEffect(() => {
    fetchDevelopers();
    fetchNotes();
  }, []);

  const fetchDevelopers = async () => {
    const response = await fetch(`${supabaseUrl}/rest/v1/developers?select=*`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    const data = await response.json();
    setDevelopers(data);
    setFilteredDevelopers(data);
  };

  const fetchNotes = async () => {
    const response = await fetch(`${supabaseUrl}/rest/v1/notes?select=*`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredDevelopers(developers);
    } else {
      const filtered = developers.filter((dev) => dev.name.toLowerCase().includes(term.toLowerCase()) || dev.location.toLowerCase().includes(term.toLowerCase()) || dev.technologies.some((tech) => tech.toLowerCase().includes(term.toLowerCase())));
      setFilteredDevelopers(filtered);
    }
  };

  const handleNoteChange = (e) => {
    setNoteContent(e.target.value);
  };

  const saveNote = async () => {
    const method = selectedNote ? "PATCH" : "POST";
    const url = selectedNote ? `${supabaseUrl}/rest/v1/notes?id=eq.${selectedNote}` : `${supabaseUrl}/rest/v1/notes`;
    const body = selectedNote ? { note: noteContent } : { note: noteContent };

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      fetchNotes();
      setNoteContent("");
      setSelectedNote("");
      toast({
        title: "Note saved successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${supabaseUrl}/rest/v1/notes?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (response.ok) {
      fetchNotes();
      toast({
        title: "Note deleted successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <Box>
        <Input placeholder="Search developers by name, location or technology..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} size="lg" width="auto" />
        <Button onClick={() => handleSearch(searchTerm)} leftIcon={<FaSearch />} ml={2}>
          Search
        </Button>
      </Box>
      <VStack spacing={4} align="stretch">
        {filteredDevelopers.map((dev) => (
          <Flex key={dev.id} p={5} shadow="md" borderWidth="1px" align="center" justify="space-between">
            <VStack align="start">
              <Text fontWeight="bold">{dev.name}</Text>
              <Text>{dev.location}</Text>
              <HStack>
                {dev.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </HStack>
            </VStack>
            <Button leftIcon={<FaEnvelope />} onClick={() => alert(`Send message to ${dev.name}`)}>
              Message
            </Button>
          </Flex>
        ))}
      </VStack>
      <Box>
        <Textarea placeholder="Write a note..." value={noteContent} onChange={handleNoteChange} />
        <Button leftIcon={<FaSave />} colorScheme="blue" onClick={saveNote}>
          Save Note
        </Button>
      </Box>
      <VStack spacing={4} align="stretch">
        {notes.map((note) => (
          <Flex key={note.id} p={5} shadow="md" borderWidth="1px" align="center" justify="space-between">
            <Text>{note.note}</Text>
            <HStack>
              <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => deleteNote(note.id)}>
                Delete
              </Button>
            </HStack>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;
