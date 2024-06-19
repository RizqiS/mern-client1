import { useState } from "react";
import Button from "../../shared/components/FormElement/Button";
import Card from "../../shared/components/UIElement/Card";
import { IPlaces } from "../types/places.type";
import Modal from "../../shared/components/UIElement/Modal";
import Maps from "../../shared/components/UIElement/Maps";
import { Link, useRouteLoaderData } from "react-router-dom";

import { useMutation } from "react-query";
import { deletePlace } from "../api/placeFetch";
import { client } from "../../shared/utils/query-client";
import { url } from "../../shared/utils/host-server";
type TProps = {
  place: IPlaces;
};

export default function PlaceItem({ place }: TProps) {
  const [showMap, setShowMap] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dataToken = useRouteLoaderData("token") as { users: { token: string } };

  const handlerOpenMap = () => setShowMap(true);
  const handlerCloseMap = () => setShowMap(false);
  const handlerOpenDeleteModal = () => setDeleteModal(true);
  const handlerCloseDeleteModal = () => setDeleteModal(false);

  const mutation = useMutation({
    mutationFn: deletePlace,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      console.log("error message");
    },
  });

  const confirmeDelete = () => {
    setDeleteModal(false);
    mutation.mutate({ id: place.id });
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={handlerCloseMap}
        header={place.address}
        footer={<Button btnAttribute={{ type: "button", onClick: handlerCloseMap }}>CLOSE</Button>}
      >
        {" "}
        <div className="w-full h-96">
          <Maps center={place.location} zoom={16} />
        </div>{" "}
      </Modal>

      <Modal
        show={deleteModal}
        onCancel={handlerCloseDeleteModal}
        header="Are you sure ?"
        footer={
          <>
            <Button
              btnAttribute={{ onClick: handlerCloseDeleteModal }}
              className="bg-transparent hover:bg-slate-100 border border-black mr-5"
            >
              Cancel
            </Button>
            <Button btnAttribute={{ onClick: confirmeDelete }}>Delete</Button>
          </>
        }
      >
        <div className="flex justify-center">
          <p className="my-4 text-lg max-w-lg text-center">
            Do you want to process and delete this place? Please note that it can't be undone thearefer
          </p>
        </div>
      </Modal>

      <li>
        <Card>
          <Link to={`${place.id}`}>
            <div className="mb-3">
              <img src={`${url}/${place.image}`} alt={place.title} className="rounded-lg" />
            </div>
            <div className="mb-3">
              <h2 className="mb-1.5 font-semibold text-xl md:text-2xl">{place.title}</h2>
              <h3 className="mb-2 text-slate-400 text-sm font-semibold">{place.address}</h3>
              <p className="text-slate-600 font-serif text-lg">{place.description}</p>
            </div>
          </Link>
          <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row justify-between">
            <Button
              btnAttribute={{ onClick: handlerOpenMap }}
              className="bg-sky-600 hover:bg-sky-500 transition duration-150 text-white  cursor-pointer text-xs md:my-0"
            >
              Viem On Map
            </Button>
            {dataToken && dataToken.users.token && (
              <div className="flex flex-col md:flex-row justify-between gap-y-3 md:gap-y-0 md:space-x-3">
                <Button to={`/places/${place.id}/edit`}>Edit</Button>
                <Button btnAttribute={{ onClick: handlerOpenDeleteModal }}>Delete</Button>
              </div>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
