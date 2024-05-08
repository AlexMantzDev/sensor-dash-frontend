export interface SensorData {
  _id: string;
  data: {
    timestamp: string;
    temperature: number;
    humidity: number;
  };
  device: string;
}
