
import React from 'react';
import type { Recommendation, Smartphone } from '../types';
import { AppleIcon, GoogleIcon, SamsungIcon, SmartphoneIcon, CameraIcon, BatteryIcon, CpuIcon } from './icons';

interface RecommendationCardProps {
  recommendation: { reason: string; model: string; details?: Smartphone };
  index: number;
}

const BrandIcon: React.FC<{ brand?: string }> = ({ brand }) => {
    const lowerBrand = brand?.toLowerCase() || '';
    if (lowerBrand.includes('apple')) return <AppleIcon className="w-6 h-6 text-dark-text-secondary" />;
    if (lowerBrand.includes('samsung')) return <SamsungIcon className="w-6 h-6 text-dark-text-secondary" />;
    if (lowerBrand.includes('google')) return <GoogleIcon className="w-6 h-6 text-dark-text-secondary" />;
    return <SmartphoneIcon className="w-6 h-6 text-dark-text-secondary" />;
};

const SpecItem: React.FC<{ icon: React.ReactNode; label: string; value?: string }> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2 text-sm">
        <div className="text-brand-primary">{icon}</div>
        <span className="font-semibold text-dark-text-secondary">{label}:</span>
        <span className="text-dark-text">{value || 'N/A'}</span>
    </div>
);

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index }) => {
  const { model, reason, details } = recommendation;
  const delay = index * 150;

  return (
    <div
      className="bg-dark-surface rounded-2xl p-6 flex flex-col border border-gray-700 hover:border-brand-primary transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
      style={{ animation: `fadeInUp 0.6s ${delay}ms both ease-out` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-sm font-bold text-brand-primary">
            {index === 0 ? 'Top Pick' : index === 1 ? 'Second Choice' : 'Great Alternative'}
          </span>
          <h3 className="text-2xl font-bold text-dark-text">{model}</h3>
          {details?.brand && <p className="text-md text-dark-text-secondary flex items-center gap-2"><BrandIcon brand={details.brand} /> {details.brand}</p>}
        </div>
        <div className="text-3xl font-black text-gray-700">#{index + 1}</div>
      </div>

      <p className="text-dark-text-secondary mb-6 flex-grow italic">"{reason}"</p>

      <div className="space-y-3 pt-4 border-t border-gray-700">
        <h4 className="font-bold text-dark-text">Key Specs:</h4>
        <SpecItem icon={<CameraIcon className="w-5 h-5" />} label="Main Camera" value={`${details?.main_camera_mp} MP`} />
        <SpecItem icon={<BatteryIcon className="w-5 h-5" />} label="Battery" value={`${details?.battery_mAh} mAh`} />
        <SpecItem icon={<CpuIcon className="w-5 h-5" />} label="Chip" value={details?.soc_chip} />
      </div>
      <div className="mt-6">
        <img src={`https://picsum.photos/seed/${model}/400/300`} alt={model} className="w-full h-40 object-cover rounded-lg"/>
      </div>
    </div>
  );
};

export default RecommendationCard;
