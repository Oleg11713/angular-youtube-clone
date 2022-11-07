import { HeaderService } from './header.service';

describe('HeaderService', () => {
    let service = new HeaderService();

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return true if request contains forbidden word', () => {
        expect(service.checkSearchQueryForBadWords('black')).toEqual(true);
        expect(service.checkSearchQueryForBadWords('BLACK')).toEqual(true);
        expect(service.checkSearchQueryForBadWords('b.l.a.c.k')).toEqual(true);
        expect(service.checkSearchQueryForBadWords('b-l-a-c-k')).toEqual(true);
        expect(service.checkSearchQueryForBadWords('b,l,a,c,k')).toEqual(true);
        expect(service.checkSearchQueryForBadWords('blac7k')).toEqual(true);
        expect(service.checkSearchQueryForBadWords('black person')).toEqual(true);
    });

    it('should return false if request does not contain forbidden word', () => {
        expect(service.checkSearchQueryForBadWords('cats')).toEqual(false);
    });
});