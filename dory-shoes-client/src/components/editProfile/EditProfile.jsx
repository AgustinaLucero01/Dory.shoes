import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { useAuth } from "../Service/auth/usercontext/UserContext";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../ui/ConfirmModal.jsx";
import { BsFillTrash3Fill } from "react-icons/bs";

const EditProfile = () => {
  const { id, handleLogout, token } = useAuth();

  const [favourites, setFavourites] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleCloseUser = () => {
    handleLogout();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Obtener favoritos del usuario
  useEffect(() => {
    fetchFavourites();
  }, [id]);

  const fetchFavourites = async () => {
    try {
      const res = await fetch(`http://localhost:3000/showFavourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFavourites(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Eliminar favorito
  const handleDeleteFavourite = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/deleteFavourite/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("No se pudo eliminar el favorito.");

      fetchFavourites();
      toast.error("💔 Producto eliminado de favoritos", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await fetch(`http://localhost:3000/deleteUser/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setShowModal(false);
      handleLogout();
    } catch (err) {
      console.log("Error al eliminar el usuario:", err);
    }
  };

  return (
    <div
      className="edit-profile-container"
      style={{ marginTop: "30vh", paddingRight: "2em" }}
    >
      <ToastContainer />
      <div style={{ flex: 1, textAlign: "center" }}>
        <h2 style={{ paddingBottom: "2rem" }}>Editar Perfil</h2>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        {/* Columna izquierda: edición */}
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          <Register role={"user"} isEdit={true} />
        </div>

        {/* Columna derecha: favoritos y acciones de cuenta */}

        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          <div
            style={{
              border: "1px solid rgb(157, 157, 157)",
              borderRadius: "10px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              maxWidth: "500px",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <h4 style={{ margin: 0 }}>Acciones de cuenta</h4>
            <button
              onClick={toggleModal}
              style={{
                height: "40px",
                width: "80%",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Eliminar usuario
            </button>
            <button
              onClick={handleCloseUser}
              style={{
                height: "40px",
                width: "80%",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          </div>
          <h3>Tus productos favoritos ❤</h3>
          {favourites.length === 0 ? (
            <p>No tenés productos en favoritos.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {favourites.map((fav) => (
                <li
                  key={fav.id}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    width: "600px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={fav.product?.imageUrl}
                      alt={fav.product?.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <span
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => navigate(`/product/${fav.product?.id}`)}
                    >
                      {fav.product?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteFavourite(fav.id)}
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      border: "none",
                      fontSize: "1.4rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ConfirmModal
        show={showModal}
        onHide={toggleModal}
        onConfirm={handleDeleteUser}
        title={"Eliminar usuario"}
        message={"¿Estás seguro de que deseas eliminar tu usuario?"}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default EditProfile;
