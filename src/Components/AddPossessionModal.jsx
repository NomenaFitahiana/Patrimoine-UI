import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function AddPossessionModal({
  show,
  handleClose,
  onPossessionAdded,
}) {
  const [formState, setFormState] = useState({
    libelle: "",
    valeur: "",
    dateDebut: "",
    tauxAmortissement: "",
    valeurConstante: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_URL_API }/possession`, {
        ...formState,
        possesseurNom: "John Doe",
      })
      .then((response) => {
        console.log("Possession ajoutée:", response.data);
        onPossessionAdded(response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la possession:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nouvelle Possession</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="libelle">
            <Form.Label>Libellé</Form.Label>
            <Form.Control
              type="text"
              name="libelle"
              value={formState.libelle}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="valeur">
            <Form.Label>Valeur Initiale</Form.Label>
            <Form.Control
              type="number"
              name="valeur"
              value={formState.valeur}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="dateDebut">
            <Form.Label>Date de Début</Form.Label>
            <Form.Control
              type="date"
              name="dateDebut"
              value={formState.dateDebut}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="tauxAmortissement">
            <Form.Label>Taux d'Amortissement</Form.Label>
            <Form.Control
              type="number"
              name="tauxAmortissement"
              value={formState.tauxAmortissement}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="valeurConstante">
            <Form.Label>Valeur Constante</Form.Label>
            <Form.Control
              type="number"
              name="valeurConstante"
              value={formState.valeurConstante}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
