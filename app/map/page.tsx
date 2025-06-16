import GoogleMaps from "@/components/Maps";
import Navbar from "@/components/Navbar";

function Page() {
  const markers = [
    {
      lat: 51.5074,
      lng: 0.1278,
      title: "London",
    },
    {
      lat: 40.7128,
      lng: -74.006,
      title: "New York",
    },
    {
      lat: 34.0522,
      lng: -118.2437,
      title: "Los Angeles",
    },
    {
      lat: 41.8781,
      lng: -87.6298,
      title: "Chicago",
    },
  ];

  return (
    <div>
      <Navbar />
      <GoogleMaps markers={markers} />
      {/* <GoogleMaps markers={markers} /> */}
    </div>
  );
}
export default Page;
