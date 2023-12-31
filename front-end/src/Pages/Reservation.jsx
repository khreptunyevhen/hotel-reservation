import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReservationData } from "../context/reservationDataContext";
import Title from "../components/Title";
import Notification from "../components/UI/Notification";
import { AlertTriangle } from "lucide-react";
import Button from "../components/UI/Button";
import ReservationsTable from "../components/ReservationsTable";
import InfoBox from "../components/InfoBox";

const BASE_URL = "http://localhost:7000/";
const PROFIT_PERCENT = 0.15;

function Reservation() {
  const { accessibleReservationRooms } = useReservationData();
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchByOwner, setSearchByOwner] = useState("");

  const uniqueOwners = [
    ...new Set(accessibleReservationRooms?.map((owner) => owner.owner)),
  ];

  const ownerFiltered = accessibleReservationRooms?.filter((owner) =>
    filter === "all" ? owner.owner : owner.owner === filter,
  );

  const searchByOwnerData = ownerFiltered?.filter((owner) =>
    owner.owner.toLowerCase().includes(searchByOwner.toLowerCase()),
  );

  const ownersCount = [
    ...new Set(searchByOwnerData?.map((ownerInfo) => ownerInfo.owner)),
  ].length;

  const unitsCount = [
    ...new Set(searchByOwnerData?.map((ownerInfo) => ownerInfo.unit)),
  ].length;

  const totalMoney = searchByOwnerData?.reduce(
    (price, ownerInfo) => price + ownerInfo.price,
    0,
  );

  // TODO: fix error when click before upload file
  // TODO: hide pagination and send email button when no owner found
  const sendEmails = async () => {
    try {
      const uniqueEmails = Array.from(
        new Set(
          accessibleReservationRooms.map(
            (reservation) => reservation["owner email"],
          ),
        ),
      );

      for (const email of uniqueEmails) {
        const ownerReservations = accessibleReservationRooms
          .filter((reservation) => reservation["owner email"] === email)
          .sort((a, b) => a.unit - b.unit);
        const units = [...new Set(ownerReservations.map((unit) => unit.unit))];

        const subject = `Your ${
          units.length === 1 ? "unit" : "units"
        } ${units.join(", ")} ${
          units.length === 1 ? "has" : "have"
        } been reserved!`;

        const body = ownerReservations
          .map(
            (reservation) =>
              `Unit: ${reservation.unit} Check-in: ${reservation["check-in"]} Check-out: ${reservation["check-out"]}`,
          )
          .join("\n");

        await axios.post(`${BASE_URL}send-emails`, {
          email,
          subject,
          body,
        });
      }

      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to send emails");
    }
  };

  return (
    <section>
      <Title>Future reservations</Title>
      {accessibleReservationRooms ? (
        <div className="mb-8 flex items-center space-x-8">
          <InfoBox name="owners" value={ownersCount} />
          <InfoBox name="units" value={unitsCount} />
          <InfoBox name="days" value={16} />
          <InfoBox name="money" value={totalMoney} />
          <InfoBox
            name="our %"
            value={Math.floor(totalMoney * PROFIT_PERCENT)}
          />
        </div>
      ) : null}
      <div className="mb-4 rounded-lg bg-background p-4">
        {accessibleReservationRooms ? (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between">
              <h2 className="text-lg font-bold">Details</h2>
              <form className="flex flex-wrap items-center gap-2">
                <select
                  className="w-full border border-text p-2 md:w-auto"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">all owners</option>
                  {uniqueOwners?.map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
                <input
                  className="w-full border border-text p-2 outline-none md:w-auto"
                  type="search"
                  placeholder="🔎 search by owner"
                  value={searchByOwner}
                  onChange={(e) => setSearchByOwner(e.target.value)}
                />
              </form>
            </div>
            <ReservationsTable info={searchByOwnerData} />
            <p className="mb-0 flex items-center justify-between">
              <span>Showing 1 to X of X reservations</span>
              <span className="cursor-pointer">prev 1 ... X next</span>
            </p>
          </>
        ) : (
          <Notification>
            <AlertTriangle className="text-red-500" />
            <p className="mb-0">
              No file is uploaded yet! You can upload{" "}
              <Link
                className="font-medium underline transition duration-300 hover:text-primary"
                to="/"
              >
                here
              </Link>
              .
            </p>
          </Notification>
        )}
      </div>
      {accessibleReservationRooms ? (
        <div>
          <p>You can send owners emails with all the information they need!</p>
          <Button onClick={sendEmails} type="button">
            Send Emails
          </Button>
        </div>
      ) : null}
      {error && <p>{error}</p>}
    </section>
  );
}

export default Reservation;
