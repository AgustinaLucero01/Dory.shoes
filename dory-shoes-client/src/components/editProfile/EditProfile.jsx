import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { useAuth } from "../Service/auth/usercontext/UserContext";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const { id } = useParams();
  const [favourites, setFavourites] = useState([]);
  const {handleLogout}=useAuth()
  const navigate = useNavigate();


  const handleCloseUser=()=>{
    handleLogout()
    navigate("/")
  }

  const handleBackHome=()=>{
    navigate("/")
  }
  // Obtener favoritos del usuario
  useEffect(() => {
    fetchFavourites();
  }, [id]);

  const fetchFavourites = async () => {
    try {
      const res = await fetch(`http://localhost:3000/showFavourites/${id}`);
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

  return (
    <div
      className="edit-profile-container"
      style={{ marginTop: "30vh", paddingRight: "2em" }}
    >
      <ToastContainer />
      <div style={{ flex:1 , textAlign: "center" }}>
          <h2 style={{ paddingBottom: "2rem" }}>Editar Perfil</h2>
        </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Columna izquierda: edición */}
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          <Register role={"user"} isEdit={true} />
        </div>

        {/* Columna derecha: favoritos */}
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
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
                    <span>{fav.product?.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteFavourite(fav.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom:"15px" }}>
        <div>
          <button onClick={handleBackHome} style={{height:"45px", width:"150px", marginLeft:"15px", backgroundColor:"black" }}>Volver</button>
        </div>
        <div>
          <button onClick={handleCloseUser} style={{height:"45px", width:"150px", marginLeft:"15px", backgroundColor:"red"}}>Cerrar sesión</button>
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default EditProfile;
