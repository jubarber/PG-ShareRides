import React from "react";
import "./PaginacionComentarios.css";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
export default function PaginacionComentarios({
  comentariosPorPagina,
  comentarios,
  paginacion,
  pagina,
  setPagina,
}) {
  const pageNum = [];
  const totalPages = Math.ceil(comentarios / comentariosPorPagina);

  for (let i = 1; i <= totalPages; i++) {
    pageNum.push(i);
  }

  const prevPage = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const nextPage = () => {
    if (pagina < totalPages) {
      setPagina(pagina + 1);
    }
  };

  return (
    <>
      <div className="contenedor-paginacion">
        <button onClick={prevPage} className="navegacion" id="prev">
          <BiFirstPage />
        </button>
        {pageNum &&
          pageNum.map((e) => (
            <span key={e} className="paginacion">
              <button className="active" onClick={() => paginacion(e)}>
                {e}
              </button>
            </span>
          ))}
        <button onClick={nextPage} className="navegacion" id="next">
          <BiLastPage />
        </button>
      </div>
    </>
  );
}
