import { AlertTriangle } from "lucide-react";
const importantColumns = ["owner", "unit", "check-in", "check-out"];

function ReservationsTable({ info }) {
  const importantReservationData = info?.map((reservation) => {
    const pureReservationInfo = {};

    importantColumns.forEach((column) => {
      pureReservationInfo[column] = reservation[column];
    });

    return pureReservationInfo;
  });

  return (
    <>
      {info.length > 0 ? (
        <table className="mb-4 w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-accent text-lg text-background">
              {Object.keys(importantReservationData[0]).map((title, i) => (
                <th className="py-2" key={`table-title-${i}`}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {importantReservationData.map((reservationInfo, i) => (
              <tr
                className="bg-secondary text-center"
                key={`reservation-info-${i}`}
              >
                {Object.keys(reservationInfo).map((unit, i) => (
                  <td className="py-2" key={`unit-${i}`}>
                    {reservationInfo[unit]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="flex items-center gap-2 bg-secondary px-4 py-2 text-lg">
          <AlertTriangle className="text-red-500" />
          <span>Cannot find owners with this name</span>
        </p>
      )}
    </>
  );
}

export default ReservationsTable;
