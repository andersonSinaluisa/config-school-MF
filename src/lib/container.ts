import { contianerScolar } from '@/scolar/domain/inversify';
import { Container } from 'inversify';

const container = new Container();

container.load(contianerScolar);

export default container;