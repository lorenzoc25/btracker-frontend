import Package from './Package';
import { Package as PackageType } from '../types/package';

interface PackageListProps {
  items : PackageType[];
  isExtended: boolean;
}

const PackageList = ({
  items,
  isExtended,
}: PackageListProps) => (
  <>
    {
      items.map(
        (item) => <Package key={item.tracking} item={item} isExtended={isExtended} />,
      )
    }
  </>
);

export default PackageList;
