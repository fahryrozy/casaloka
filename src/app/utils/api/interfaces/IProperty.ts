export interface IPropertyDetailRequest {
  slug: string;
}

export interface IPropertyDetailResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: PropertyDetail;
}

export interface PropertyDetail {
  log_number: string;
  properti_detail: PropertyDetailData;
}

export interface PropertyDetailData {
  id: string;
  nama: string;
  nama_alias: string;
  nama_alias_show: string;
  slug: string;
  tipe_bangunan: string;
  keterangan: string;
  alamat: string;
  province_code: string;
  city_code: string;
  district_code: string;
  village_code: string;
  harga: string;
  kamar_tidur: string;
  kamar_mandi: string;
  luas_bangunan: string;
  luas_tanah: string;
  jumlah_lantai: string;
  surat: string;
  imb: string;
  link_video_youtube: string;
  status_properti: string;
  created_datetime: Date;
  updated_datetime: Date;
  request_approval_id: string;
  request_approval_first_flag: string;
  nama_alias_show_name: string;
  tipe_bangunan_name: string;
  surat_name: string;
  imb_name: string;
  status_properti_name: string;
  properti_image_list: PropertiImageList[];
  properti_approval_list: string;
  properti_approval_list_list: string[];
}

export interface PropertiImageList {
  log_number: string;
  properti_id: number;
  image_url: string;
  image_url_real: string;
}

export interface PropertiImageList {
  logNumber: string;
  propertiID: number;
  imageURL: string;
  imageURLReal: string;
}

export interface IPropertyListRequest {
  page_size: string;
  current_page: string;
  search: string;
  orderby: string;
  orderby_index: string;
  filter?: Filter;
}

export interface Filter {
  harga_start?: string;
  harga_end?: string;
  village_code?: string;
  district_code?: string;
  city_code?: string;
  province_code?: string;
  status_properti_name?: string;
}

export interface IPropertyListResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: IPropertyList;
}

export interface IPropertyList {
  log_number: string;
  datas: IPropertyListData[];
  row_datas: string;
  offset_row_datas: number;
  order_by_list: OrderByList[];
}

export interface IPropertyListData {
  id: string;
  nama: string;
  nama_alias: string;
  nama_alias_show: string;
  slug: string;
  tipe_bangunan: string;
  keterangan: string;
  alamat: string;
  province_code: string;
  city_code: string;
  district_code: string;
  village_code: string;
  harga: string;
  kamar_tidur: string;
  kamar_mandi: string;
  luas_bangunan: string;
  luas_tanah: string;
  jumlah_lantai: string;
  surat: string;
  imb: string;
  link_video_youtube: string;
  status_properti: string;
  created_datetime: Date;
  updated_datetime: Date;
  request_approval_id: string;
  request_approval_first_flag: string;
  nama_alias_show_name: string;
  tipe_bangunan_name: string;
  surat_name: string;
  imb_name: string;
  status_properti_name: string;
  properti_image_list: PropertiImageList[];
  properti_approval_list: string[];
  village_name: string;
  district_name: string;
  city_name: string;
  province_name: string;
}

export interface PropertiImageList {
  log_number: string;
  properti_id: number;
  image_url: string;
  image_url_real: string;
}

export interface OrderByList {
  name: string;
  index: string;
}
