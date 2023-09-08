type LogRawData = {
  index: string;
  time: string | Date;
  data: Record<string, any>;
};

export default LogRawData;
