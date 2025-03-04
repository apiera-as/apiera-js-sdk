import { DTO } from '../../types';

/**
 * Abstract base class for all DTOs
 */
export abstract class AbstractDTO implements DTO {
    /**
     * Convert the DTO to a plain object
     */
    abstract toJSON(): Record<string, any>;
}