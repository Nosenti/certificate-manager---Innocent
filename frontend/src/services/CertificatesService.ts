import {  UUID } from 'crypto';
import api from '../utils/api';
import { AssignedUser, Participant, Supplier, Certificate } from '../../types/types';

export const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const data: Certificate[] = await api(`certificates`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCertificateByHandle = async (handle: UUID) => {
  try {
    const data = await api(`certificates/${handle}`);
    return data;
  } catch (error) {
    console.error('Error fetching results: ', error);
    throw error;
  }
};

export const updateCertificate = async (certificate: {
  handle: UUID;
  data: Certificate;
}) => {
  try {
    const { handle, data } = certificate;
    const response = await api(`certificates/${handle}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Updated certificate: ', response);
    return response;
  } catch (error) {
    console.error('Error updating certificate: ', error);
    throw error;
  }
};

export const addCertificate = async (data: any) => {
  try {
    const response = await api('certificates', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Added certificate: ', response);
    return response;
  } catch (error) {
    console.error('Error adding certificate: ', error);
    throw error;
  }
};

export const deleteCertificate = async (handle: UUID) => {
  try {
    const response: Response = await api(`certificates/${handle}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error deleting certificate: ', error);
    throw error;
  }
};

export const getSuppliers = async (
  name?: string,
  index?: string,
  city?: string,
): Promise<Supplier[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (name) queryParams.append('name', name);
    if (index) queryParams.append('index', index);
    if (city) queryParams.append('city', city);

    const response: Supplier[] = await api(
      `suppliers?${queryParams.toString()}`,
    );
    return response;
  } catch (error) {
    console.error('Error fetching suppliers: ', error);
    throw error;
  }
};

export const getParticipants = async (
  name?: string,
  userId?: string,
  department?: string,
  plant?: string,
): Promise<Participant[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (name) queryParams.append('name', name);
    if (userId) queryParams.append('userId', userId);
    if (department) queryParams.append('department', department);
    if (plant) queryParams.append('plant', plant);

    const response: Participant[] = await api(`participants?${queryParams.toString()}`);
    return response;
  } catch (error) {
    console.error('Error fetching participants: ', error);
    throw error;
  }
};